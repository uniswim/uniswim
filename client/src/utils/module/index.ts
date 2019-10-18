
export class Module {
    /** */
    declarations: any
    /** Exporte les éléments visibles par les autres modules */
    exports: any
    /** Module dont dépend le module */
    imports: Module[] = []
    /** Services utilisables par tous les composants de l'application */
    providers: any
    bootstrap: any
    schemas: any
    entryComponents: any
}