# Parking garage case

Deployed on Netlify at: https://monumental-haupia-f503af.netlify.app/

### Technologies:

-   React with Vite
-   Typescript
-   Redux-toolkit
-   Tailwind

### Project structure

-   public
-   src
    -   lib
        -   components (_Layouts and smaller components_)
            -   UppercaseComponent
                -   index.tsx
        -   hooks (_hooks for useAppDispatch and useAppSelector. Description in file._)
            -   index.tsx
        -   models
            -   garage.ts (interfaces and enums)
        -   modules (_Larger components that should be separated into modules_)
            -   UppercaseModule
                -   index.tsx
        -   store
            -   slices
                -   garageSlice.ts (Only store in this project)
            -   index.ts (configureStore and typings)
            -   init.ts (initializes the inital store)
    -   App.tsx
    -   index.css
    -   vite.env.d.ts
-   ... configs
