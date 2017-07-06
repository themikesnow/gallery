module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "babel"
    ],
    "env": {
    	"browser": true,        
        "jasmine": true,
		"jest": true
    },
    "globals": {
        "google": true,        
    },
    rules: {    	
  		"import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  		"max-len": ["error", 500],
  		"jsx-a11y/no-static-element-interactions": "off",
        "babel/semi": 2,        
        "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
        "class-methods-use-this": "off"        
    }
};
