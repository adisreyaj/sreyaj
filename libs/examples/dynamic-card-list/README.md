# Dynamic Card List

A really cool way to create highly customizable card list. For table like cards, if you want to render display different
data in different designs; after a point it becomes very difficult with dedicated card lists for each of the use cases.
Having a single card list component which is dynamic enough to render wide variety of designs would make things much
easier.

You'll have to only maintain one component. It does have some limitations, but if designed carefully to take into
consideration all the different use cases, it can be a very powerful component.

## Features

- Highly customizable
- Re-usable
- Easy to use
- Less boilerplate code to maintain
- Consistency in design

## Concepts

There are a couple of things to be aware of to make sense of how we implement things. We also make good use of Angular
strong Dependency Injection (DI) system. We'll see how we can provide custom components and dynamically create and
attach them to the view. We use concepts like Dynamic Component Creation, Injectors, Injection Tokens etc.

### Renderers

So if we consider the card like a table, then the columns are where we display the data. So each of these columns can
display different types of
information like text, image, button, etc. So we can have different renderers for each of these types. For example, we
can have a text renderer which will render text, an image renderer which will render an image, etc.

So Renderer is basically a component that will render the data in a particular way.

#### Core Renderers

We will have some core renderers which will be used by default. For example,

- Text Renderer
- Badge Renderer

#### Custom Renderers

If there are use cases which are not covered by the core renderers, then we can create custom renderers. For example, we
need to display a user's name with the
profile picture. So we can create a custom renderer for this use case.

### Renderers Registry

So we need a way to keep track of the renderers that we will create and use in the application. Users can create a lot
of custom renderers according
to their use cases. We use a `type` to identify the renderer. So all the renders that are created should have a unique
type. We can use this type `type`
associated with them.

We use a **Service** as our registry (`ColumnRenderersRegistryService`). We expose a `Map` to store the type to renderer
mapping. We expose two methods:

- `registerRenderers` to register renderers
- `lookup` to lookup a renderer by type

### Main Component

There is a main component `sreyaj-exp-card-list` which is the component the consumers will use. The component takes in
two inputs:

1. `columnConfig` - An array of column config that is used to render each column
2. `dataSource` - The data source which drives the component

## Implementation

The column config is what drives the view part of the component. Here is how you define it:

```ts
[{
    id: 'name',
    display: CustomRenderers.NameWithAvatar,
    width: 2,
}, {
    id: 'email',
    display: CoreListColumnRendererType.Text,
    width: 4,
}]
```

The `id` is what connects the view and the data. The datasource should contain an object with the keys mentioned as `id`
in the column config.

The `display` is the type of the renderer. It can be a core renderer or a custom renderer. This key will be used to
look up the corresponding renderer to be
used for that particular column.

### Registering Renderers

There are methods exposed to register default renderers and for custom renderers. The default renderers are registered
in the constructor of the `sreyaj-exp-card-list`.

```ts
export const registerDefaultRenderers = (): void => {
    registerCustomRenderers([
        TextColumnRendererComponent,
        BadgeColumnRendererComponent,
    ]);
};

export const registerCustomRenderers = (
    renderers: ListColumnRendererConstructor[]
): void => {
    const rendererLookupService = inject(ColumnRenderersRegistryService);
    rendererLookupService.registerRenderers(renderers);
};
```

We inject the `ColumnRenderersRegistryService` and use it to register the renderers.

### Attaching Renderers to the View

This magic happens in the `sreyaj-exp-card-list-column-renderer` component. This is how we do it:

```ts
if (!this.columnConfig || !this.data) {
    return;
}
// Get the corresponding renderer for the display type
const renderer = this.rendererLookupService.lookup(
    this.columnConfig?.display
);
if (renderer) {
// Dynamically create the component and pass the data with the help of Injection Token
    this.vcr.createComponent(renderer, {
        injector: Injector.create({
            providers: [
                {
                    provide: COLUMN_RENDERER_DATA,
                    useValue: this.data[this.columnConfig.id],
                },
            ],
            parent: this.parentInjector,
        }),
    });
}
```

### Inside a Renderer

Let's look at the `sreyaj-exp-card-list-text-renderer` component. This is how we get the data:

```ts
export abstract class ListColumnRendererBase<ColumnDataType = unknown> {
    public static readonly type: CoreListColumnRendererType;
    // Get the passed data by referring to the Injection Token
    public readonly data: ColumnDataType =
        inject<ColumnDataType>(COLUMN_RENDERER_DATA);
}

@Component({
    selector: 'sreyaj-exp-text-column-renderer',
    template: `
    <div>
      {{ data }} <!-- Use the data here -->
    </div>
  `,
    standalone: true,
})
@ListColumnRenderer({
    type: CoreListColumnRendererType.Text,
})
export class TextColumnRendererComponent extends ListColumnRendererBase {
}

```

