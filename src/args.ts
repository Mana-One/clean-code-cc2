export class Args {
    public flags: Map<string, string> = new Map();
    public booleanValues: Map<string, boolean> = new Map();
    public numberValues: Map<string, number> = new Map();
    public stringValues: Map<string, string> = new Map();

    constructor(schema: string) {
        const flagInputs = schema.split(",");
        flagInputs.forEach(f => {
            if (f.length === 1) {
                this.flags.set(f, "boolean");
                return;
            }
            if (f[1] === "#") {
                this.flags.set(f[0], "number");
                return;
            }
            if (f[1] === "*") {
                this.flags.set(f[0], "string");
                return;
            }

            throw new Error("Invalid schema.")
        })
    }
    
    parse(input: string): void {
        try {
            const inputs = input.match(/(?:[^\s']+|'[^']*')+/g) as Array<string>;
            for(let i = 0; i < inputs.length; i++) {
                const value = inputs[i];
                const valueToStore = inputs[i + 1];

                if (value[0] === "-") {
                    const flagType = this.flags.get(value[1]);
                    if (flagType === undefined) {
                        continue;
                    }
                    
                    switch(flagType) {
                        case "boolean":
                            this.booleanValues.set(value[1], true);
                            break;

                        case "number":
                            if (valueToStore[0] === "-") {
                                throw new Error("Invalid input(s).");
                            }
                            this.numberValues.set(value[1], parseInt(valueToStore));
                            i++;
                            break;

                        default: 
                            if (valueToStore[0] === "-") {
                                throw new Error("Invalid input(s).");
                            }
                            this.stringValues.set(value[1], valueToStore.substring(1, valueToStore.length - 1))
                            i++;
                    }
                }
            }

        } catch(err) {
            throw new Error("Invalid inputs.")
        }
    }

    getBoolean(key: string): boolean {
        return this.booleanValues.get(key) || false;
    }

    getNumber(key: string): number {
        return this.numberValues.get(key) || 0;
    }

    getString(key: string): string {
        return this.stringValues.get(key) || "";
    }
}