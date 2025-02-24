from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from app.models import *
import json
import os
# from .gh_pages import main
import subprocess
import socket

port = 8010








































def create_files_and_folders(data, base_path="."):
    """
    Recursively creates folders and files based on the given JSON structure.
    
    Args:
        data (list): The JSON data representing files and folders.
        base_path (str): The root directory where files and folders should be created.
    """
    for item in data:
        item_path = os.path.join(base_path, item["name"])

        if item["type"] == "folder":
            os.makedirs(item_path, exist_ok=True)
            print(f"Created folder: {item_path}")
            create_files_and_folders(item["children"], item_path)

        elif item["type"] == "file":
            os.makedirs(os.path.dirname(item_path), exist_ok=True)
            
            # Define the default content
            file_content = item.get("content", "")
            
            # If the file is a JSON file, replace single quotes with double quotes
            if item_path.lower().endswith(".json"):
                file_content = file_content.replace("'", '"')

            # If the file is main.tsx, replace its content with the specified content
            if os.path.basename(item_path) == "main.tsx":
                file_content = """import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App/>);
"""

            with open(item_path, "w", encoding="utf-8") as file:
                file.write(file_content)
            
            print(f"Created file: {item_path}")

def is_port_free(port, host='0.0.0.0'):
    """
    Check if a specific port is free on the given host.
    
    Args:
        port (int): The port number to check.
        host (str): The host address (default: '0.0.0.0' to check all interfaces).
        
    Returns:
        bool: True if the port is free, False if it is in use.
    """
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        # Set SO_REUSEADDR to allow reuse of the address
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            sock.bind((host, port))
            return True  # Bind succeeded, port is free
        except OSError:
            return False  # Bind failed, port is in use
# Example Usage:


# Path to the directory where the Dockerfile is located


# from .serializers import SignupSerializer, LoginSerializer
# Specify the output directory where files should be created
output_directory = "fuck_satvik_hello"  # Change this to your desired path

# Call the function to start creating files and folders in the specified output directory


dockerfile_content = """\
# Stage 1: Build the React App
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
"""

nginx_conf = """\
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: proxy API requests if needed
    # location /api/ {
    #     proxy_pass http://backend-service:8000;
    #     proxy_set_header Host $host;
    #     proxy_set_header X-Real-IP $remote_addr;
    #     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #     proxy_set_header X-Forwarded-Proto $scheme;
    # }
}

"""

print(nginx_conf)
class dockerView(APIView):

    
    def post(self,request):
        id = request.data.get("id")
        email = request.data.get("email")
        json_string = request.data.get("data")
        print(json_string)
        
        data = json.loads(json_string)

        data.append({
            "name":"Dockerfile",
            "_filePath":"Dockerfile",
            "content":dockerfile_content,
            "type":"file"
        })


        data.append({
            "name":"nginx.conf",
            "_filePath":"nginx.conf",
            "content":nginx_conf,
            "type":"file"
        })

        print(data)
        print(os.getcwd())
        finalDir = str(os.getcwd()) + f"/uploads/{email}/{id}"
        print(finalDir)
        create_files_and_folders(data, finalDir)


        dockerfile_dir = finalDir

        project_dir = finalDir
        print("present dir",project_dir)

        
        for i in range(8010,100000):
            if is_port_free(port):
                port = str(port)
                break

        # Step 1: Change directory and run npm install
        npm_command = ["npm", "install"]
        result = subprocess.run(npm_command, cwd=project_dir, capture_output=True, text=True)
        if result.returncode == 0:
            print("npm install succeeded:")
            print(result.stdout)
        else:
            print("npm install failed:")
            print(result.stderr)
            

        # Step 2: Build the Docker image (if not already built)
        docker_build_command = ["docker", "build", "-t", id, "."]
        result = subprocess.run(docker_build_command, cwd=project_dir, capture_output=True, text=True)
        if result.returncode == 0:
            print("Docker build succeeded:")
            print(result.stdout)
        else:
            print("Docker build failed:")
            print(result.stderr)
            

        # Step 3: Run the Docker container
        docker_run_command = ["docker", "run", "-d", "-p", f"{port}:80", id]
        result = subprocess.run(docker_run_command, capture_output=True, text=True)
        if result.returncode == 0:
            print("Docker container started successfully:")
            print(result.stdout)

            return Response({
                "error":False,
                "port":port
            },status.HTTP_200_OK)
        
        else:
            print("Failed to start container:")
            print(result.stderr)


        return Response({
            "error":True,
            "port":port
        },status.HTTP_200_OK)
    
    

class deployView(APIView):
    def post(self,request):
        id = request.data.get("id")
        email = request.data.get("email")
        print("os getcwd")
        print(os.getcwd())
        project_dir = str(os.getcwd()) + f"/uploads/{email}/{id}"
        npm_command = ["npm", "run","build"] 
        result = subprocess.run(npm_command, cwd=project_dir, capture_output=True, text=True)
        if result.returncode == 0:
            print("npm install succeeded:")
            file_path = project_dir + "/dist/index.html"

            # Read the original content
            with open(file_path, "r", encoding="utf-8") as file:
                content = file.read()

            # Replace occurrences of '"/' with '"./'
            new_content = content.replace('"/', '"./')

            # Write the new content back to the file (or to a new file)
            with open(file_path, "w", encoding="utf-8") as file:
                file.write(new_content)

            print(result.stdout)
            print((project_dir + "/dist"))

            print("cwd: \n",os.getcwd())
            
            gh_pages_write = project_dir + "/git_hub.py"
            with open(f"{os.getcwd()}/app/gh_pages.py",'r') as rea:
                print("reading ------")
                fcontent = rea.read() + f'\nmain("{id}","dist")'
                fcontent = fcontent.replace('REPO_HERE', id)
                # print(fcontent)
            with open(f"{project_dir}/github.py", "w", encoding="utf-8") as file:
                print(f"{project_dir}/github.py")
                file.write(fcontent)
            

            npm_command = ["python3", "github.py"]
            result = subprocess.run(npm_command, cwd=project_dir, capture_output=True, text=True)
            if result.returncode == 0:
                print("npm i rhdgh ghg hdg fnstall succeeded:")
                print(result.stdout)
            else:
                print("npm install failed:")
                print(result.stderr)
            


        else:
            print("npm install failed:")
            print(result.stderr)
        return Response({
            "hello":"that"
        },status.HTTP_200_OK)
        


class SignupView(APIView):



    def post(self, request):
        name = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        isUserpreSent = UserProfile.objects.filter(email=email)

        if(isUserpreSent.exists()):
            return Response({
                "error":"True",
                "message":"you already sign up please login"
            },status.HTTP_200_OK)

        finalUser =  UserProfile(name=name,email=email,password=password)
        finalUser.save()
        return Response({
            "error":False,
            "name":name,
            "email":email,
            "password":password

        }, status=status.HTTP_200_OK)

class LoginView(APIView):
    def get(self, request):
        # Provide a simple message or instructions
        pass
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        print(email)
        print(password)
        isUserpreSent = UserProfile.objects.filter(email=email)
        if(not isUserpreSent.exists()):
            return Response({
                "error":True,
                "message":"Please register first"
            })
        
        checkPassword = str(isUserpreSent[0].password) == password
        print("f1",isUserpreSent[0].password)
        print("f2",password)
        print(checkPassword)
        if(not checkPassword):
           return Response({
                "error":True,
                "message":"password does not match"
            })
        

        return Response({
            "error":False,
            "email":isUserpreSent[0].email,
            "name":isUserpreSent[0].name

        }, status=status.HTTP_200_OK)




































