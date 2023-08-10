https://www.youtube.com/watch?v=W1Kttu53qTg

0. install nodejs

    > npm init
    > npm i express nodemon ejs body-parser dotenv mongoose axios morgan
    
    // Middleware เพื่ออ่าน JSON ที่ถูกส่งมาใน body
    // app.use(express.json());
    // express.json(): ใช้เมื่อคุณต้องการรับและส่งข้อมูลในรูปแบบ JSON ซึ่งเป็นไปได้ในกรณีที่คุณต้องการการสื่อสารระหว่างแอปพลิเคชันและไคลเอ็นต์เป็น JSON ได้ง่ายและสะดวก ตัวอย่างเช่นเมื่อคุณใช้ API สำหรับการส่งคำขอและการตอบกลับด้วย JSON มีเป็นต้น
    
    ตัวอย่าง
        app.use(express.json());
        app.post('/api/data', (req, res) => {
            const requestData = req.body;
            // ประมวลผลข้อมูล requestData
            res.json({ success: true, data: requestData });
        });

    // Middleware เพื่ออ่านและแปลงข้อมูลที่ถูกส่งมาใน body ของ HTTP request ให้อยู่ในรูปแบบของ JSON
    // extended เป็น true ซึ่งจะอนุญาตให้เราส่งข้อมูลที่มีโครงสร้างซับซ้อนแบบ nested object ได้ ซึ่งสะดวกในการจัดการข้อมูลจากแบบฟอร์มที่มีฟิลด์ต่าง ๆ และอาจมีโครงสร้างซับซ้อน
    // app.use(express.urlencoded({ extended: true }));
    // express.urlencoded(): ใช้เมื่อคุณต้องการรับและส่งข้อมูลจากแบบฟอร์ม (URL-encoded form data) ซึ่งเป็นไปได้ในกรณีที่คุณต้องการรับข้อมูลจากแบบฟอร์มที่ส่งมาจากเว็บเพจ หรือการส่งข้อมูลจากแอปพลิเคชันของคุณไปยังเว็บเซิร์ฟเวอร์เป็นแบบฟอร์ม 
    
    ตัวอย่าง
        app.use(express.urlencoded({ extended: true }));
        app.post('/form', (req, res) => {
            const formData = req.body;
            // ประมวลผลข้อมูล formData
            res.send('Received form data');
        });

1. package.json

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "nodemon server.js"
    },

2. create folders 

    nodejs-express-ejs-tutorial > server.js, config.env
    nodejs-express-ejs-tutorial > assets > css, js, img
    nodejs-express-ejs-tutorial > views
    nodejs-express-ejs-tutorial > server > controller, databasae, model, routes, services

3. set port in config.env

    -config.env
        PORT=3000

4. create file

    nodejs-express-ejs-tutorial > assets > css > style.css
    nodejs-express-ejs-tutorial > views > include > _header.ejs, footer.ejs
    nodejs-express-ejs-tutorial > views > index.ejs

5. สร้างไฟล์ ejs file

    -views > include > _header.ejs

    -views > include > _footer.ejs

    -view > index.ejs, add_user.ejs, update_user.ejs

6. สร้าง server.js

    const express = require('express')
    const dotenv = require('dotenv')
    const morgan = require('morgan')
    const bodyparser = require('body-parser')
    const path = require('path')

    const app = express()

    // load process.env.PORT from config.env
    dotenv.config({path:'config.env'})
    const PORT = process.env.PORT||8080

    // log requests
    app.use(morgan('tiny'))

    // parse request to body-parser
    app.use(bodyparser.urlencoded({extended: true}))

    // set view engine for [Every time you use res.render()]
    // res.render() so that the HTML content must be handled by EJS as you have to set it. Allow is EJS.
    app.set('view engine', 'ejs')

    // set view engine for [res.render() in this directory]
    // Express will look for templates in this directory when you use res.render() to render them. This is where Express will look for templates to use to render the page.
    // app.set('view', path.resolve(__dirname, 'views/ejs'))

    // ตัวอย่าง load assets
    // express.static(root, [options])

    // app.use(express.static('public'))
    // http://localhost:3000/images/kitten.jpg
    // http://localhost:3000/css/style.css
    // http://localhost:3000/js/app.js
    // http://localhost:3000/images/bg.png
    // http://localhost:3000/hello.html

    // app.use('/static', express.static('public'))
    // http://localhost:3000/static/images/kitten.jpg
    // http://localhost:3000/static/css/style.css
    // http://localhost:3000/static/js/app.js
    // http://localhost:3000/static/images/bg.png
    // http://localhost:3000/static/hello.html

    // อย่างไรก็ตาม เส้นทางที่คุณให้ไว้ในฟังก์ชัน express.static มีความสัมพันธ์กับไดเรกเทอรีจากที่ซึ่งคุณการบวนการรัน node ของคุณ ถ้าคุณรัน app จากไดเรกเทอรีอื่น มันจะปลอดภัยกว่าถ้าใช้เส้นทางจริงของไดเรกเทอรีที่คุณต้องการบริการไฟล์คงที่
    // const path = require('path')
    // app.use('/static', express.static(path.join(__dirname, 'public')))

    // ตัวอย่างของ Windows
    // console.log(path.resolve('/foo/bar', './baz')); // Output: C:\foo\bar\baz
    // console.log(path.join('/foo/bar', './baz'));    // Output: \foo\bar\baz

    app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
    app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
    app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))

    app.get('/', (req, res) => {
        // show message crud app on website
        // res.send('crud app')

        res.render('index')
    })

    app.get('/add_user', (req, res) => {
        res.render('add_user')
    })

    app.get('/update_user', (req, res) => {
        res.render('update_user')
    })

    app.listen(PORT, ()=>{console.log(`server is running on http://localhost:${PORT}`) })

7. ลองสร้างไฟล์ views > index.html, ลองสร้างไฟล์ views > add_user.html, ลองสร้างไฟล์ views > update_user.html, ใส่ assets > css > style.css
    [file:///C:/Users/user/Desktop/website/nodejs-express-ejs-mongodb-tutorial/views/add_user.html]
    
    -index.html 

    // โดยมีการ link cdn font awesome จาก https://cdnjs.com/libraries/font-awesome <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    // โดยมีการ link css <link rel="stylesheet" href="../assets/css/style.css">
    // เลือก icons จาก font awesome icon
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CRUD App</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="../assets/css/style.css">
        </head>
        <body>
            <!-- Header -->
            <header id="header">
                <nav>
                    <div class="container">
                        <div class="text-center">
                            <a href="/" class="nav-brand text-dark">User Management System</a>
                        </div>
                    </div>
                </nav>
            </header>

            <!-- Main Site -->
            <main id="site-main">
                <div class="container">
                    <div class="box-nav d-flex justify-between">
                        <a href="/add_user" class="border-shadow">
                            <span class="text-gradient">New User<i class="fa-solid fa-user"></i></span>
                        </a>
                    </div>

                    <!-- form handing -->
                    <form action="/" method="POST">
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>@Email</th>
                                    <th>Gender</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Username</td>
                                    <td>example@gmail.com</td>
                                    <td>Male</td>
                                    <td>Active</td>
                                    <td>
                                        <a href="#" class="btn border-shadow update">
                                            <span class="text-gradient"><i class="fa-solid fa-pencil"></i></span>
                                        </a>
                                        <a href="#" class="btn border-shadow delete">
                                            <span class="text-gradient"><i class="fas fa-times"></i></span>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>

                </div>
            </main>
        </body>
        </html>

    -add_user.html

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CRUD App</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="../assets/css/style.css">
        </head>
        <body>
            <!-- Header -->
            <header id="header">
                <nav>
                    <div class="container">
                        <div class="text-center">
                            <a href="/" class="nav-brand text-dark">User Management System</a>
                        </div>
                    </div>
                </nav>
            </header>

            <!-- Main Site -->
            <main id="site-main">
                <div class="container">
                    <div class="box-nav d-flex justify-between">
                        <div class="filter">
                            <a href="/"><i class="fas fa-angle-double-left"></i>All Users</a>
                        </div>
                    </div>
                    <div class="form-title text-center">
                        <h2 class="text-dark">New User</h2>
                        <span class="text-light">Use the below form to create a new account</span>
                    </div>

                    <!-- form handing -->
                    <form method="POST" id="add_user">
                        <div class="new_user">
                            <div class="form-group">
                                <label for="name" class="text-light">Name</label>
                                <input type="hidden" name="id"value=''>
                                <input type="text" name="name" value="" placeholder="Your Name">
                            </div>

                            <div class="form-group">
                                <label for="email" class="text-light">Email</label>
                                <input type="text" name="email" value="" placeholder="example@gmail.com">
                            </div>

                            <div class="form-group">
                                <label for="gender" class="text-light">Gender</label>
                                <div class="radio inline">
                                    <input type="radio" id="radio-2" name="gender" value="Male">
                                    <label for="radio-2" class="radio-label">Male</label>
                                </div>
                                <div class="radio inline">
                                    <input type="radio" id="radio-3" name="gender" value="Female">
                                    <label for="radio-3"class="radio-label">Female</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="status" class="text-light">Status</label>
                                <div class="radio inline">
                                    <input type="radio" id="radio-4" name="status" value="Active">
                                    <label for="radio-4" class="radio-label">Active</label>
                                </div>
                                <div class="radio inline">
                                    <input type="radio" id="radio-5" name="status" value="Inactive">
                                    <label for="radio-5" class="radio-label">Inactive</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn text-dark update">Save</button>
                            </div>
                        </div>
                        
                    </form>

                </div>
            </main>
        </body>
        </html>

    -assets > css >style.css

        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');

        :root{
            --dark: #2b2d42;
            --light: #adb5bd;
            --border: #dee2e6;
            --boder-btn: #edf2f4;
        }

        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        a{
            text-decoration: none;
            font-family: 'Roboto Condensed', sans-serif;
        }

        .container{
            max-width: 1024px;
            margin: auto;
        }

        .nav-brand{
            font-size: 1.5em;
            font-weight: bold;
        }

        .d-flex{
            display: flex;
            flex-wrap: wrap;
        }

        .justify-between{
            justify-content: space-between;
        }

        .text-center{
            text-align: center;
        }

        .border-shadow{
            border: 1px solid var(--border-btn);
            box-shadow: 1px 3px 10px #e9edef;
        }

        .text-dark{
            color: var(--dark);
        }

        .inline{
            display: inline-block;
        }

        .text-light{
            color: var(--light);
        }

        .text-gradient{
            background: linear-gradient(to right, #8e2de2, #4a00e0);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        #header nav{
            background-color: rgb(215, 215, 216);
            padding: 1em 0;
            width: 100%;
        }

        #site-main{
            margin-top: 6em;
            font-family: 'Borlow', sans-serif;
        }

        #site-main .container .box-nav > a{
            font-size: 1em;
            padding: 0.5em 1em;
        }

        #site-main .container form{
            margin: 2em 0;
        }

        table{
            border-spacing: 0px;
            width: 100%;
        }

        .table td, .table th{
            padding: 0.75em;
            vertical-align: top;
            text-align: center;
            border-top: 1px solid var(--border);
        }

        .table td > a.btn{
            padding: 0.3em 1em;
            font-size: 1.1em;
            margin: 0 0.2em;
        }

        .table tr:hover{
            background-color: rgb(227, 224, 224);
        }

        .table tr:hover > a{
            box-shadow: none;
        }

        .table .thead-dark th{
            color: #fff;
            background-color: var(--dark);
            border-color: #32363e;
        }

        @media only screen and (max-width: 1024px){
            table, thead, tbody, th, td, tr{
                display: block;
            }

            thead tr{
                position: absolute;
                top: -9999px;
                left: -9999px;
            }

            tr{
                border: 1px solid var(--border);
            }

            td{
                border: none;
                border-bottom: 1px solid var(--border);
                position: relative;
            }
        }

        /* add user & update user template */
        .form-title{
            margin-top: 2em;
        }

        .form-title > h2{
            padding: 0.5em 0;
        }

        .new_user{
            max-width: 786px;
            margin: auto;
        }

        #update_user .form-group,
        #add_user .form-group{
            margin: 1em 0;
        }

        #update_user .form-group input[type="text"],
        #add_user .form-group input[type="text"]{
            width: 100%;
            padding: 0.6em 1em;
            margin: 0.5em 0;
            border: 1px solid var(--border);
            font-family: 'Barlow', sans-serif;
            font-size: 1em;
            border-radius: 0.2em;
        }

        #update_user .form-group .radio,
        #add_user .form-group .radio{
            margin: 1em 2em;
        }

        /* adding style to radio buttons */
        .radio input[type='radio']{
            position: absolute;
            opacity: 0;
        }

        .radio input[type='radio'] + .radio-label:before{
            content: "";
            background: var(--border-btn);
            border-radius: 100%;
            border: 1px solid var(--border);
            display: inline-block;
            width: 1em;
            height: 1em;
            position: relative;
            top: -0em;
            margin-right: .5em;
            vertical-align: top;
            cursor: pointer;
            text-align: center;
            -webkit-transition: all 250ms ease;
            transition: all 250ms ease;
        }

        .radio input[type='radio']:checked + .radio-label:before{
            background-color: darkblue;
            box-shadow: inset 0 0 0 4px #e9ecef;
        }

        .radio input[type='radio']:focus + .radio-label:before{
            outline: none;
            border-color:blue;
        }

        .radio input[type='radio']:disabled + .radio-label:before{
            box-shadow: inset 0 0 0 4px #e9ecef;
            border-color: #b4b4b4;
            background: #b4b4b4;
        }

        #update_user .form-group .btn,
        #add_user .form-group .btn{
            width: 100%;
            padding: .9em 1em;
            background-color:#16db93; 
            border: none;
            font-family: 'Roboto Condensed', sans-serif;
            font-size: 1em;
            cursor: pointer;
            border-radius: .2em;
            margin: .5em 0;
        }

        #update_user .form-group .btn:hover,
        #add_user .form-group .btn:hover{
            background-color: var(--dark);
            color: var(--border);
        }

8. ทำการแยกส่วนจาก html > ejs
    index.html -> index.ejs (_header.ejs + code index.html เฉพาะส่วน main site + _show.ejs + _footer.ejs)
    add_user.html -> add_user.ejs (_header.ejs + + code add_user.html เฉพาะส่วน main site + _form.ejs + _footer.ejs)
    update_user.html -> update_user.ejs (_header.ejs + code add_user.html เฉพาะส่วน main site + _footer.ejs)

    -views > include > _header.ejs นำเอาส่วน header ของ index.html มา โดยสังเกตว่า link ส่วน href="css/style.css" ของ css จะเปลี่ยนเป็น <link rel="stylesheet" href="css/style.css"> เนื่องจากมีการ load assets ใน server.js แล้ว

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CRUD App</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="css/style.css">
        </head>
        <body>
            <!-- Header -->
            <header id="header">
                <nav>
                    <div class="container">
                        <div class="text-center">
                            <a href="/" class="nav-brand text-dark">User Management System</a>
                        </div>
                    </div>
                </nav>
            </header>

    -views > include > _show.ejs

        <tr>
            <td>1</td>
            <td>Username</td>
            <td>example@gmail.com</td>
            <td>Male</td>
            <td>Active</td>
            <td>
                <a href="#" class="btn border-shadow update">
                    <span class="text-gradient"><i class="fa-solid fa-pencil"></i></span>
                </a>
                <a href="#" class="btn border-shadow delete">
                    <span class="text-gradient"><i class="fas fa-times"></i></span>
                </a>
            </td>
        </tr>

    -views > include > _form.ejs

        <!-- form handing -->
        <form method="POST" id="add_user">
            <div class="new_user">
                <div class="form-group">
                    <label for="name" class="text-light">Name</label>
                    <input type="hidden" name="id"value=''>
                    <input type="text" name="name" value="" placeholder="Your Name">
                </div>

                <div class="form-group">
                    <label for="email" class="text-light">Email</label>
                    <input type="text" name="email" value="" placeholder="example@gmail.com">
                </div>

                <div class="form-group">
                    <label for="gender" class="text-light">Gender</label>
                    <div class="radio inline">
                        <input type="radio" id="radio-2" name="gender" value="Male">
                        <label for="radio-2" class="radio-label">Male</label>
                    </div>
                    <div class="radio inline">
                        <input type="radio" id="radio-3" name="gender" value="Female">
                        <label for="radio-3"class="radio-label">Female</label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="status" class="text-light">Status</label>
                    <div class="radio inline">
                        <input type="radio" id="radio-4" name="status" value="Active">
                        <label for="radio-4" class="radio-label">Active</label>
                    </div>
                    <div class="radio inline">
                        <input type="radio" id="radio-5" name="status" value="Inactive">
                        <label for="radio-5" class="radio-label">Inactive</label>
                    </div>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn text-dark update">Save</button>
                </div>
            </div>
            
        </form>

    -views > include > _footer.ejs

        </body>
        </html>

    -views > index.ejs

        <!-- include header -->
        <%- include('include/_header') %>

        <!-- Main Site -->
        <main id="site-main">
            <div class="container">
                <div class="box-nav d-flex justify-between">
                    <a href="/add_user" class="border-shadow">
                        <span class="text-gradient">New User<i class="fa-solid fa-user"></i></span>
                    </a>
                </div>

                <!-- form handing -->
                <form action="/" method="POST">
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>@Email</th>
                                <th>Gender</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <%- include('include/_show') %>
                            </tr>
                        </tbody>
                    </table>
                </form>

            </div>
        </main>

        <!-- include footer -->
        <%- include('include/_footer') %>
    
    -views > add_user.ejs [http://localhost:3000/add_user]

        <!-- include header -->
        <%- include('include/_header') %>
            <!-- Main Site -->
            <main id="site-main">
                <div class="container">
                    <div class="box-nav d-flex justify-between">
                        <div class="filter">
                            <a href="/"><i class="fas fa-angle-double-left"></i>All Users</a>
                        </div>
                    </div>
                    <div class="form-title text-center">
                        <h2 class="text-dark">New User</h2>
                        <span class="text-light">Use the below form to create a new account</span>
                    </div>
                    <%- include('include/_form') %>

                </div>
            </main>
        <!-- include footer -->
        <%- include('include/_footer') %>

    -views > update_user.ejs [http://localhost:3000/update_user]

        <!-- include header -->
        <%- include('include/_header') %>
            <!-- Main Site -->
            <main id="site-main">
                <div class="container">
                    <div class="box-nav d-flex justify-between">
                        <div class="filter">
                            <a href="/"><i class="fas fa-angle-double-left"></i>All Users</a>
                        </div>
                    </div>
                    <div class="form-title text-center">
                        <h2 class="text-dark">Update User</h2>
                        <span class="text-light">Use the below form to Update an account</span>
                    </div>
                    <!-- form handing -->
                    <form method="POST" id="update_user">
                        <div class="new_user">
                            <div class="form-group">
                                <label for="name" class="text-light">Name</label>
                                <input type="hidden" name="id"value=''>
                                <input type="text" name="name" value="" placeholder="Your Name">
                            </div>

                            <div class="form-group">
                                <label for="email" class="text-light">Email</label>
                                <input type="text" name="email" value="" placeholder="example@gmail.com">
                            </div>

                            <div class="form-group">
                                <label for="gender" class="text-light">Gender</label>
                                <div class="radio inline">
                                    <input type="radio" id="radio-2" name="gender" value="Male">
                                    <label for="radio-2" class="radio-label">Male</label>
                                </div>
                                <div class="radio inline">
                                    <input type="radio" id="radio-3" name="gender" value="Female">
                                    <label for="radio-3"class="radio-label">Female</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="status" class="text-light">Status</label>
                                <div class="radio inline">
                                    <input type="radio" id="radio-4" name="status" value="Active">
                                    <label for="radio-4" class="radio-label">Active</label>
                                </div>
                                <div class="radio inline">
                                    <input type="radio" id="radio-5" name="status" value="Inactive">
                                    <label for="radio-5" class="radio-label">Inactive</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn text-dark update">Save</button>
                            </div>
                        </div>
                    </form>

                </div>
            </main>
        <!-- include footer -->
        <%- include('include/_footer') %>

9. แก้ไข a href เพื่อทำการเปลี่ยนหน้าไปมา

    -views > _show.ejs

        <tr>
            <td>1</td>
            <td>Username</td>
            <td>example@gmail.com</td>
            <td>Male</td>
            <td>Active</td>
            <td>
                <a href="/update_user" class="btn border-shadow update">
                    <span class="text-gradient"><i class="fa-solid fa-pencil"></i></span>
                </a>
                <a class="btn border-shadow delete">
                    <span class="text-gradient"><i class="fas fa-times"></i></span>
                </a>
            </td>
        </tr>

10. ทำการเรียก routes จาก router.js ที่ server.js 
    
    -nodejs-express-ejs-mongodb-tutorial > server.js

        app.use('/', require('./server/routes/router'))
        app.use('/add_user', require('./server/routes/router'))
        app.use('/update_user', require('./server/routes/router'))

    -nodejs-express-ejs-mongodb-tutorial > server > routes > router.js

        const express = require('express')
        const route = express.Router()

        route.get('/', (req, res) => {
            res.render('index')
        })

        route.get('/add_user', (req, res) => {
            res.render('add_user')
        })

        route.get('/update_user', (req, res) => {
            res.render('update_user')
        })

        module.exports = route

11. ทำการเพิ่ม services > render.js

    -render.js

        exports.homeRoutes = (req, res) => {
            res.render('index')
        }

        exports.add_user = (req, res) =>{
            res.render('add_user');
        }

        exports.update_user = (req, res) => {
            res.render('update_user')
        }

    -แก้ไข router.js

        const express = require('express')
        const route = express.Router()

        const services = require('../services/render')

        // @description Root Route
        // @method GET/
        route.get('/', services.homeRoutes)

        // @description add users
        // @method GET/add_user
        route.get('/add_user', services.add_user)

        // @description update users
        // @method GET/update_user
        route.get('/update_user', services.update_user)

        module.exports = route

12. mongodb

    Database access > add new database user > user: admin, password : admin123456
    Network access > add current ip address
    Database > connect > MongoDB for VS Code > copy mongodb+srv://admin:<password>@cluster0.hqkw3js.mongodb.net/

    -config.env

        PORT=3000
        MONGO_URI=mongodb+srv://admin:admin123456@cluster0.hqkw3js.mongodb.net/

    -server > database > connection.js

        const mongoose = require('mongoose')

        const connectDB = async() => {
            try{
                const con = await mongoose.connect(process.env.MONGO_URI,{
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    // useFindAndModify: false,
                    // useCreateindex: true
                })
                console.log(`MongoDB connected : ${con.connection.host}`)
            }catch(err){
                console.log(err)
                process.exit(1)
            }
        }

        module.exports = connectDB

    -server.js

        const connectDB = require('./server/database/connection')

        //mongodb connection
        connectDB()

13. API สร้าง schema, สร้าง route สำหรับ api, สร้าง controller สำหรับ CRUD

    -model.js สร้าง schema

        const mongoose = require('mongoose')

        var schema = new mongoose.Schema({
            name:{
                type: String,
                required: true
            },
            email:{
                type: String,
                required: true,
                unique: true
            },
            gender: String, 
            status: String
        })

        const Userdb = mongoose.model('userdb', schema)

        module.exports = Userdb

    -server > routes > router.js

        const express = require('express')
        const route = express.Router()

        const services = require('../services/render')
        const controller = require('../controller/controller')

        // @description Root Route
        // @method GET/
        route.get('/', services.homeRoutes)

        // @description add users
        // @method GET/add-user
        route.get('/add_user', services.add_user)

        // @description update users
        // @method GET/update_user
        route.get('/update_user', services.update_user)

        //API
        route.post('/api/users', controller.create)
        route.get('/api/users', controller.find)
        route.put('/api/users/:id', controller.update)
        route.delete('/api/users/:id', controller.delete)

        module.exports = route
    
    -server > controller > controller.js

        var Userdb = require('../model/model')

        //create and save new user
        exports.create = (req, res) => {

        }

        // retrieve and return all users/ retrive and return a single user
        exports.find = (req, res) => {

        }

        // update a new idetified user by user id
        exports.update = (req, res) => {

        }

        // Delete a user with spacified user id in the request
        exports.delete = (req, res) => {
            
        }

14. แก้ไข controller.js เพื่อ CRUD

    -server > controller > controller.js

        var Userdb = require('../model/model')

        //create and save new user
        // POST http://localhost:3000/api/users
        exports.create = (req, res) => {
            if(!req.body){
                res.status(400).send({messge: 'contact can not be empty'})
                return 
            }
            // new user
            const user = new Userdb({
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                status: req.body.status
            })

            console.log(user)

            // save user in the database
            user
                .save(user)
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({message: err.message || 'Some error occurred while creating a create operation'})
                })
        }

        // retrieve and return all users/ retrive and return a single user
        // GET http://localhost:3000/api/users
        // GET http://localhost:3000/api/users?id=64d4cc8fa4a70ca802a1602e
        exports.find = (req, res) => {
            if(req.query.id){
                const id = req.query.id
                Userdb.findById(id)
                    .then(data => {
                        if(!data){
                            res.status(404).send({message: 'Not found user with id' + id})
                        }else{
                            res.send(data)
                        }
                    }).catch(err=> {
                        res.status(500).send({message: 'Error retrieving user with id' + id})
                    })
            }
            else{
                Userdb.find()
                    .then(user=>{
                        res.send(user)
                    })
                    .catch(err=>{
                        res.status(500).send({message:err.message || 'Error Occurred while retriving user information'})
                    })
            }
        }

        // update a new idetified user by user id
        // PUT http://localhost:3000/api/users/64d4cc8fa4a70ca802a1602e
        exports.update = (req, res) => {
            if (!req.body){
                return res
                .status(400)
                .send({message: 'Data to update can not be empty'})
            }

            const id = req.params.id
            Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
            .then(data=>{
                if(!data){
                    res.status(404).send({message: `Cannot Update user with ${id} Maybe user not found`})
                }else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message: 'error update user information'})
            })
        }

        // Delete a user with spacified user id in the request
        // Delete http://localhost:3000/api/users/64d4d06f78494a62aaa30bb9
        exports.delete = (req, res) => {
            const id = req.params.id
            Userdb.findByIdAndDelete(id)
            .then(data => {
                if (!data){
                    res.status(404).send({message: `Cannot Delete with id ${id} Maybe id is wrong`})
                }else{
                    res.send({
                        message: 'User was deleted successfully'
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: 'Could not delete User with id =' + id
                })
            })
        }

15. Using API (show all users) ทำการแสดงข้อมูลหน้า index.ejs ดังนั้นเมื่อมีการเรียกใช้งาน http://localhost:3000/ จะทำการ get http://localhost:3000/api/users และส่งค่าไป index.ejs

    -server > services > render.js

        const axios = require('axios')

        exports.homeRoutes = (req, res) => {
            //Make a get request to /api/users
            axios.get('http://localhost:3000/api/users')
                .then(function(response){
                    res.render('index', {users: response.data})
                })
                .catch(err=>{
                    res.send(err)
                })
        }

    -views > include > _show.ejs 
        
        //นำค่าที่ส่งมาจาก homeroutes ใน render.js มาทำการ loop

        <% for(var i = 0; i < users.length; i++){ %>
        <tr>
            <td><%= i+1 %></td>
            <td><%= users[i].name %></td>
            <td><%= users[i].email %></td>
            <td><%= users[i].gender %></td>
            <td><%= users[i].status %></td>
            <td>
                <a href="/update_user" class="btn border-shadow update">
                    <span class="text-gradient"><i class="fa-solid fa-pencil"></i></span>
                </a>
                <a class="btn border-shadow delete">
                    <span class="text-gradient"><i class="fas fa-times"></i></span>
                </a>
            </td>
        </tr>
        <% } %>

16. Using API (create new user)

    -server > services > render.js เนื่องจากการ add_user เป็นการรับค่ามาจาก form จึงไม่ต้องส่งค่าไปกับ render

        exports.add_user = (req, res) =>{
            res.render('add_user');
        }

    -views > include > _form.ejs ทำการเพิ่ม action = "/api/users

        <form action="/api/users" method="POST" id="add_user">

    -server > controller > controller.js ทำการแก้ไขเป็น res.redirect('/add_user') แทน

        var Userdb = require('../model/model')

        //create and save new user
        // POST http://localhost:3000/api/users
        exports.create = (req, res) => {
            if(!req.body){
                res.status(400).send({messge: 'contact can not be empty'})
                return 
            }
            // new user
            const user = new Userdb({
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                status: req.body.status
            })

            console.log(user)

            // save user in the database
            user
                .save(user)
                .then(data => {
                    // res.send(data)
                    res.redirect('/add_user')
                })
                .catch(err => {
                    res.status(500).send({message: err.message || 'Some error occurred while creating a create operation'})
                })
        }

    -_footer.ejs ทำการเพิ่ม jquery cdn และ เรียก /js/index.js

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js" integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="/js/index.js"></script>

        </body>
        </html>

    -assets > js > index.js

        $('#add_user').submit(function(event){
            alert('Data Inserted Successfully')
        })

17. Using API (update user)

    //นำค่าที่ส่งมาจาก homeroutes ใน render.js ส่งไปที่ update_user
    //axios.get(`http://localhost:3000/api/users?id=${req.query.id}`) ทำการส่งข้อมูล user เพียงแค่คนเดียว
    -render.js
        
        exports.update_user = (req, res) => {
            axios.get(`http://localhost:3000/api/users?id=${req.query.id}`)
                .then(function(userdata){
                    res.render('update_user', {user: userdata.data})
                })
                .catch(err=>{
                    res.send(err)
                })
        }

    -_show.ejs ทำการแก้ <a href="/update_user?id=<%= users[i]._id%>"

        <% for(var i = 0; i < users.length; i++){ %>
        <tr>
            <td><%= i+1 %></td>
            <td><%= users[i].name %></td>
            <td><%= users[i].email %></td>
            <td><%= users[i].gender %></td>
            <td><%= users[i].status %></td>
            <td>
                <a href="/update_user?id=<%= users[i]._id%>" class="btn border-shadow update">
                    <span class="text-gradient"><i class="fa-solid fa-pencil"></i></span>
                </a>
                <a class="btn border-shadow delete">
                    <span class="text-gradient"><i class="fas fa-times"></i></span>
                </a>
            </td>
        </tr>
        <% } %>

    // ทำการเพิ่ม value='<%= user._id %>', <%= user.gender == 'Male' ? 'checked' : '' %>
    -update_user.ejs 

        <!-- include header -->
        <%- include('include/_header') %>
            <!-- Main Site -->
            <main id="site-main">
                <div class="container">
                    <div class="box-nav d-flex justify-between">
                        <div class="filter">
                            <a href="/"><i class="fas fa-angle-double-left"></i>All Users</a>
                        </div>
                    </div>
                    <div class="form-title text-center">
                        <h2 class="text-dark">Update User</h2>
                        <span class="text-light">Use the below form to Update an account</span>
                    </div>
                    <!-- form handing -->
                    <form method="POST" id="update_user">
                        <div class="new_user">
                            <div class="form-group">
                                <label for="name" class="text-light">Name</label>
                                <input type="hidden" name="id"value='<%= user._id %>'>
                                <input type="text" name="name" value="<%= user.name %>" placeholder="Your Name">
                            </div>

                            <div class="form-group">
                                <label for="email" class="text-light">Email</label>
                                <input type="text" name="email" value="<%= user.email %>" placeholder="example@gmail.com">
                            </div>

                            <div class="form-group">
                                <label for="gender" class="text-light">Gender</label>
                                <div class="radio inline">
                                    <input type="radio" id="radio-2" name="gender" value="Male" <%= user.gender == 'Male' ? 'checked' : '' %>>
                                    <label for="radio-2" class="radio-label">Male</label>
                                </div>
                                <div class="radio inline">
                                    <input type="radio" id="radio-3" name="gender" value="Female" <%= user.gender == 'Female' ? 'checked' : '' %>>
                                    <label for="radio-3"class="radio-label">Female</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="status" class="text-light">Status</label>
                                <div class="radio inline">
                                    <input type="radio" id="radio-4" name="status" value="Active" <%= user.status == 'Active' ? 'checked' : '' %>>
                                    <label for="radio-4" class="radio-label">Active</label>
                                </div>
                                <div class="radio inline">
                                    <input type="radio" id="radio-5" name="status" value="Inactive" <%= user.status == 'Inactive' ? 'checked' : '' %>>
                                    <label for="radio-5" class="radio-label">Inactive</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn text-dark update">Save</button>
                            </div>
                        </div>
                        
                    </form>

                </div>
            </main>
        <!-- include footer -->
        <%- include('include/_footer') %>

    //var unindexed_array = $(this).serializeArray(): ใช้ jQuery ดึงข้อมูลจากฟอร์มที่ถูกส่งมา (โดย $(this) จะเป็นฟอร์มที่เรียกใช้งานโค้ดนี้) และ .serializeArray() จะแปลงข้อมูลจากฟอร์มเป็นอาเรย์ของอ็อบเจ็กต์ที่มี key ชื่อ (name) และค่า (value) สำหรับแต่ละฟิลด์ในฟอร์ม
    //$.map(unindexed_array, function(n, i){...}): ใช้ $.map() ของ jQuery เพื่อวนลูปผ่านอาเรย์ unindexed_array และใช้ฟังก์ชัน callback เพื่อเพิ่มข้อมูลลงในอ็อบเจ็กต์ data โดยกำหนด key เป็นชื่อ (name) และ value เป็นค่า (value) จากแต่ละอ็อบเจ็กต์ในอาเรย์
    -assets > js > index.js

        $('#update_user').submit(function(event){
            event.preventDefault()
            var unindexed_array = $(this).serializeArray()
            var data = {}
            $.map(unindexed_array, function(n, i){
                data[n['name']] = n['value']
            })

            console.log(data)

            var request = {
                'url' : `http://localhost:3000/api/users/${data.id}`,
                'method' : 'PUT',
                'data' : data
            }

            $.ajax(request).done(function(response){
                alert('data updated successfully')
            })
        })

18. Using API (delete user)

    -_show.ejs ทำการเพิ่มค่า data-id ตามตัวอย่าง <a class="btn border-shadow delete" data-id=<%= users[i]._id%>

        <% for(var i = 0; i < users.length; i++){ %>
        <tr>
            <td><%= i+1 %></td>
            <td><%= users[i].name %></td>
            <td><%= users[i].email %></td>
            <td><%= users[i].gender %></td>
            <td><%= users[i].status %></td>
            <td>
                <a href="/update_user?id=<%= users[i]._id%>" class="btn border-shadow update">
                    <span class="text-gradient"><i class="fa-solid fa-pencil"></i></span>
                </a>
                <a class="btn border-shadow delete" data-id=<%= users[i]._id%> >
                    <span class="text-gradient"><i class="fas fa-times"></i></span>
                </a>
            </td>
        </tr>
        <% } %>


    //ถ้าค่าของ window.location.pathname เท่ากับ "/" นั่นหมายความว่าผู้ใช้กำลังอยู่ในหน้าหลักหรือหน้าหลักของเว็บไซต์ เช่น http://example.com/
    -index.js

        if(window.location.pathname == "/"){
            $ondelete = $(".table tbody td a.delete");
            $ondelete.click(function(){
                var id = $(this).attr("data-id")

                var request = {
                    "url" : `http://localhost:3000/api/users/${id}`,
                    "method" : "DELETE"
                }

                if(confirm("Do you really want to delete this record?")){
                    $.ajax(request).done(function(response){
                        alert("Data Deleted Successfully!");
                        location.reload();
                    })
                }

            })
        }

            
