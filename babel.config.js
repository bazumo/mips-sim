module.exports = (api) => {
  return {
    "presets": [
      !api.env('test') ? "@babel/preset-env" : [
        "@babel/preset-env",
        {
          targets: {
            node: '10',
          },
        },
      ],
      "@babel/preset-react"
    ],
    "plugins": [
      [
        "module-resolver",
        {
          "root": ["."],
          "alias": {
            "assembler": "./src/assembler",
            "client": "./src/client",
            "server": "./src/server",
            "simulator": "./src/simulator",
            "architecture": "./src/architecture",
            "test": "./src/test"
          }
        }
      ]
    ]
  };
};
