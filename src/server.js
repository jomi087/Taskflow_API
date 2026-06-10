import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

app.get('/health', (req, res) => {

    res.status(200).json({
        success: true,
        msg: "working perfectly"
    });
})

app.listen(port, () => console.log(`server started running in port ${port}`))