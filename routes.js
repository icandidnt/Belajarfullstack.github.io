const fs = require('fs');

const requestHandler = (req,res)=>{
    const url = req.url;
    const method = req.method;
    console.log('req.url',req.url); // isi dari req.url (/)
    console.log('req method', req.method); // isi dari req.method (GET)
    if(url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(
            `
            <body>
                <form action="/message" method="POST">
                    <input type="text" name="massage" />
                    <button type="submit">
                        submit
                    </button>
                </form>
            </body>
            `,
        );
            
        res.end();
    }

    if (url === "/message" && method === "POST") {
        const body = [];
        req.on('data',chunk =>{
            console.log('chunk',chunk);
            body.push (chunk);
        });

        return req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=') [1];
            fs.writeFile ('message.txt', message , err =>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end()
            });
        });
    }

};

module.exports = {
    requestHandler,
};