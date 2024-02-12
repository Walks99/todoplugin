/* 
This code is part of the configuration for Strapi plugins. Let me explain it for you:

1. `module.exports`: This line indicates that the following object will be exported as
 the module's content. In Node.js, the `module.exports` object is used to expose
  functionality from a module to be used by other modules.

2. `'todo'`: This is the key representing the name of the plugin. 
It's a string value used to identify the plugin within the Strapi ecosystem.

3. `enabled: true`: This property specifies whether the plugin is enabled or not. 
Setting it to `true` means the plugin is active and its functionality is available. 
If set to `false`, the plugin is disabled.

4. `resolve: './src/plugins/todo'`: This property specifies the path to the plugin's 
main file or entry point. It's the file that exports the plugin's functionality. 
In this case, the plugin is resolved from the file located at `./src/plugins/todo`.

So, this configuration is telling Strapi that there's a plugin named "todo" which is enabled, 
and its main functionality is provided by the file located at `./src/plugins/todo`. 
This setup allows Strapi to load and integrate the "todo" plugin into its ecosystem
 when the Strapi server starts up.
*/

module.exports = {
    // ...
    'todo': {
      enabled: true,
      resolve: './src/plugins/todo'
    },
    // ...
  }