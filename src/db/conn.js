

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/loanappreg", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connection successful`);
}).catch((e) => {
    console.log(`No connection: ${e.message}`);
});



