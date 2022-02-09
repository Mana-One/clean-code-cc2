import { Args } from "./args";

function main() {
    try {
        const args = new Args("d,p#,h*");
        const s = `-d -p 42 -h 'Vincent Vega' -p 45`;
        args.parse(s);
        const detach = args.getBoolean('d');
        const port = args.getNumber('p');
        const hero = args.getString('h');
        console.log(`Application running - detached (${detach}), port: (${port}), hero is (${hero})`);

    } catch(err) {
        console.error(err)
    }

}

main()