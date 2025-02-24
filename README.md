# Autonomous Application Builder
## By Team: Ctrl + Shift + N 💀

### Contributors:
- Pranab Pandey (B24148)
- Shivam Kumar (B24220)
- Shivang Tripathi (B24221)
- Satvik Garg (B24219)


## Usage Instructions

1. **Register Page** - This is the entry point of our website for the user. Here you have three details to fill. There is a button there to create the account which will only be enabled once all the details are correctly filled. Make sure to enter correct email.

1. **Login Page** - After creating the account. You will be redirected to Login page. Where once again you have enter your valid credentials. After entering correct details you will be redirected to main page.

1. **Geeks Page** - This is the main workspace where you will be able to edit your generated website by giving prompts. Here, you will also see code of generated website and it's folder structure. 

**Below folder structure, there will be three buttons.**

**Preview** - This button will give you a localhost on which your generated website will be loaded. Using, this you can view your generated website.

**Deploy** - This button will deploy your created website on Github pages and return a URL on which your website is hosted.

**Download Zip** - Using this you can also download the zip archive of generated code.

**Note** - For chat section in geeks page. Please, please only click the send button once only.
## Instructions on Running Our Project From Github Repository

1. Firstly, You have to download all the code as a zip file from Github.

1. You will get two folders inside that after extracting it from the zip which are FrontEnd and BackEnd.

1. Give sudo access for running the commands

1. Also, your laptop should have docker installed. Docker is used for preview here. 

### BackEnd

#### Run:
1. ```pip install -r requirements.txt```
1. ```python3 manage.py makemigrations```
1. ```python3 manage.py migrate```
1. ```python3 manage.py runserver 0.0.0.0:8000```

### FrontEnd

1. Run ```"npm install"```.

1. Run ```"npm run dev"```.

1. Now our main site's website will be started at the given localhost by your system.




## Folder Structure
#### by default the generated site will live on port 8010
#### and the code of the generated site is present inside the uploads directory in krackhack folder in  backend folder

- backend
    - krackhackBack
        - app
        - krackhackBack
        - requirements.txt
            
- frontend
    - public
    - src 
        - components
            - ui (contains prompt-input and message-section that makes up the chat section in '/geeks.')
            - Header.tsx and modal.tsx 
        - Login-Pages
            - Contain all login and register pages and it's css
        - store
            - contains contextAPI file and other svg icons of all frameworks
        - utility
            - contain constants file, and other files for http requests at backend.
        - contain all the major files like main, App, workspace etc.
    - contain all other files like package.json, .gitignore etc.
        
## Concise Summary Of Code

1. Firstly, We are taking raw input from the user.

1. After, this we are giving this raw prompt to an AI agent created from agent.ai which enhances the input.

1. After enhancing the input we give that prompt to another AI agent along with some XML template.

1. The AI agent returns the website code in XML format in a single file.

1. After getting XML file we use a npm library to parse it into json format. From JSON we convert it into a tree. And, give the tree to BackEnd.

1. The BackEnd creates the given folder structure and puts the appropriate code in it.

1. After creating folder structure, we have preview, deploy button.

1. The preview button checks for an empty localhost and creates a docker container and allows the user to preview it.

1. The deploy button uses the Github API and creates a repository. We host it using github pages.

1. Download as a zip, this button just simply allows the user to download generated code in a Zip file.