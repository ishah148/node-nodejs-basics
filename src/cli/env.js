const parseEnv = () => {
    const prefixRegex = /^RSS_/;
    Object.keys(process.env).forEach((key) => {
        if (prefixRegex.test(key)) {
            const variableName = key.replace(prefixRegex, '');
            const variableValue = process.env[key];
            console.log(`${variableName}: ${variableValue}`);
        }
    });
};

parseEnv();