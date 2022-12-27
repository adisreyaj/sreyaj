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

## Implementation

## Usage
