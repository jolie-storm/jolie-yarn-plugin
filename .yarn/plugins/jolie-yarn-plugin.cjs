'use strict'

module.exports = {
    name: `jolie-yarn-plugin`,
    factory: require => {
      // What is this `require` function, you ask? It's a `require`
      // implementation provided by Yarn core that allows you to
      // access various packages (such as @yarnpkg/core) without
      // having to list them in your own dependencies - hence
      // lowering your plugin bundle size, and making sure that
      // you'll use the exact same core modules as the rest of the
      // application.
      //
      // Of course, the regular `require` implementation remains
      // available, so feel free to use the `require` you need for
      // your use case!
      const {MessageName, Project, FetchResult, Installer, LocatorHash, Descriptor, DependencyMeta} = require('@yarnpkg/core');
      const {Linker, LinkOptions, MinimalLinkOptions, LinkType}                                     = require('@yarnpkg/core');
      const {Locator, Package, FinalizeInstallStatus}                                               = require('@yarnpkg/core');
      const {structUtils, Report, Manifest, miscUtils}                                              = require('@yarnpkg/core');
      const {PortablePath, npath, ppath, toFilename, Filename}                                      = require ('@yarnpkg/fslib');
      const {Command} = require(`clipanion`);

      
      
      class JolieYarnLinker {


        constructor() {
            // Nothing to do
          }

        supportsPackage(pkg, opts) {
            console.log ("line 25" + pkg);
            console.log ("line 26" + opts);
            return opts.project.configuration.get(`jolieLinker`) === `jolie-packages`;
          }
        async findPackageLocation(locator, opts) {
            console.log ("line 38" + locator);
            console.log ("line 29" + opts);
        }
        
        async findPackageLocator(location, opts) {

        } 

        makeInstaller(opts) {
    
            return new JolieInstaller(opts);
          }
     }
      

     class JolieInstaller  {
        // Stores data that we need to extract in the `installPackage` step but use
        // in the `finalizeInstall` step. Contrary to custom data this isn't persisted
        // anywhere - we literally just use it for the lifetime of the installer then
        // discard it.
        localStore= new Map();
        
        constructor(opts) {
          // Nothing to do
          this.opts = opts
        }
      
        getCustomDataKey() {
          return JSON.stringify({
            name: `JoliePackageInstaller`,
            version: 1,
          });
        }
      
       
      
        attachCustomData(customData) {
          this.customData = customData;
        }
      
        async installPackage(pkg , fetchResult ) {
            //console.log ("P" + JSON.stringify(pkg));
            //7console.log ("line 26" + JSON.stringify(fetchResult));

            console.log({pkg, fetchResult})

            const packageLocation = ppath.resolve(fetchResult.packageFs.getRealPath(), fetchResult.prefixPath);

            console.log ({packageLocation})

            return {
              packageLocation,
              buildDirective: null,
            };

        }
      ///
        async attachInternalDependencies(locator, dependencies ) {

        }
      
        async attachExternalDependents(locator, dependentPaths) {
          
        }
      
        async finalizeInstall() {
            console.log ({opts:this.opts})
        }
      }
     
      
       
      return {
        linkers: [
            JolieYarnLinker,
        ],
      };

  }
}