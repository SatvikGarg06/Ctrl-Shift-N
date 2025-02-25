import requests, base64, os

TOKEN = "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"
OWNER = "SatvikGarg12"
REPO = "REPO_HERE"
FOLDER_PATH = "dist"
BRANCH = "main"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}
BASE_URL = f"https://api.github.com/repos/{OWNER}/{REPO}"

def repo_exists(owner, repo):
    url = f"https://api.github.com/repos/{owner}/{repo}"
    resp = requests.get(url)
    if (resp.status_code == 200):
        return True
    else:
        return False

def create_repo(repo, headers, private):
    url = "https://api.github.com/user/repos"
    data = {
        "name": repo,
        "private": private,
    }
    resp = requests.post(url, json=data, headers=headers)
    if resp.status_code == 201:
        print(f"Repository {repo} created successfully!")
    else:
        print(f"Failed to create repository {repo}: {resp.json()}")

def main_branch_exists(owner, repo):
    url = f"https://api.github.com/repos/{owner}/{repo}/branches"
    resp = requests.get(url)
    if resp.status_code == 200:
        branches = [branch['name'] for branch in resp.json()]
        return 'main' in branches
    else:
        print(f"Error: {resp.status_code}, {resp.json()}")
        return False

def create_initial_commit(repo, owner):
    readme_content = ""
    encoded_content = base64.b64encode(readme_content.encode()).decode()

    commit_data = {
        "message": "Initial commit",
        "content": encoded_content,
        "branch": "main"
    }

    create_file_url = f"https://api.github.com/repos/{owner}/{repo}/contents/README.md"
    response = requests.put(create_file_url, json=commit_data, headers=HEADERS)

    if response.status_code == 201:
        print("Initial commit created successfully!")
    else:
        print(f"Error creating initial commit: {response.json()}")

def host_on_github_pages(owner, repo, headers):
    url = f"https://api.github.com/repos/{owner}/{repo}/pages"
    data = {
        "source": {
            "branch": "main",  # Change if using a different branch
            "path": "/"
        }
    }
    resp = requests.post(url, json=data, headers=headers)
    if resp.status_code in [201, 204]:  # Success codes
        print("GitHub Pages enabled successfully!")
    elif resp.json()['message'] == "GitHub Pages is already enabled.":
        pass
    else:
        print("Failed to enable GitHub Pages:", resp.json())

def upload_folder_structure(folder_path):
    
    def get_latest_commit_sha():
        """Fetch the latest commit SHA of the branch."""
        url = f"{BASE_URL}/git/refs/heads/{BRANCH}"
        response = requests.get(url, headers=HEADERS)
        if response.status_code == 200:
            return response.json()["object"]["sha"]
        raise Exception(f"Error fetching latest commit SHA: {response.json()}")


    def get_tree_sha(commit_sha):
        """Fetch the tree SHA of the latest commit."""
        url = f"{BASE_URL}/git/commits/{commit_sha}"
        response = requests.get(url, headers=HEADERS)
        if response.status_code == 200:
            return response.json()["tree"]["sha"]
        raise Exception(f"Error fetching tree SHA: {response.json()}")


    def create_blob(file_path):
        """Create a blob for a file and return its SHA."""
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()

        data = {"content": content, "encoding": "utf-8"}
        url = f"{BASE_URL}/git/blobs"
        response = requests.post(url, json=data, headers=HEADERS)
        if response.status_code == 201:
            return response.json()["sha"]
        raise Exception(f"Error creating blob: {response.json()}")


    def create_tree(base_tree_sha, files):
        """Create a new tree with files and folders."""
        tree = []
        
        for file_path, blob_sha in files.items():
            tree.append({
                "path": os.path.join("", file_path).replace("\\", "/"),
                "mode": "100644",  # Regular file
                "type": "blob",
                "sha": blob_sha,
            })

        data = {"base_tree": base_tree_sha, "tree": tree}
        url = f"{BASE_URL}/git/trees"
        response = requests.post(url, json=data, headers=HEADERS)
        if response.status_code == 201:
            return response.json()["sha"]
        raise Exception(f"Error creating tree: {response.json()}")


    def create_commit(parent_sha, tree_sha, message="Added folder via API"):
        """Create a new commit."""
        data = {"message": message, "tree": tree_sha, "parents": [parent_sha]}
        url = f"{BASE_URL}/git/commits"
        response = requests.post(url, json=data, headers=HEADERS)
        if response.status_code == 201:
            return response.json()["sha"]
        raise Exception(f"Error creating commit: {response.json()}")


    def update_branch(commit_sha):
        """Move the branch to point to the new commit."""
        data = {"sha": commit_sha, "force": True}
        url = f"{BASE_URL}/git/refs/heads/{BRANCH}"
        response = requests.patch(url, json=data, headers=HEADERS)
        if response.status_code == 200:
            print("Branch updated successfully!")
        else:
            raise Exception(f"Error updating branch: {response.json()}")


    def get_all_files(folder):
        """Recursively get all files inside a folder."""
        all_files = {}
        for root, _, files in os.walk(folder):
            for file in files:
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, folder)  # Get relative path
                all_files[relative_path] = file_path
        return all_files


    try:
        print("Fetching latest commit SHA...")
        latest_commit_sha = get_latest_commit_sha()

        print("Fetching tree SHA...")
        latest_tree_sha = get_tree_sha(latest_commit_sha)

        print("Uploading files...")
        file_paths = get_all_files(FOLDER_PATH)
        file_blobs = {path: create_blob(local_path) for path, local_path in file_paths.items()}

        print("Creating new tree...")
        new_tree_sha = create_tree(latest_tree_sha, file_blobs)

        print("Creating new commit...")
        new_commit_sha = create_commit(latest_commit_sha, new_tree_sha, message="Added folder via API")

        print("Updating branch...")
        update_branch(new_commit_sha)

        print(f"✅ Folder '{FOLDER_PATH}' pushed to GitHub!")

    except Exception as e:
        print(f"❌ Error: {e}")

def main(repo, folder_path):
    if repo_exists(OWNER, repo):
        if not(main_branch_exists(OWNER, repo)):
            create_initial_commit(repo, OWNER)
        upload_folder_structure(folder_path)
    else:
        create_repo(repo, HEADERS, False)
        create_initial_commit(repo, OWNER)
        upload_folder_structure(folder_path)

    host_on_github_pages(OWNER, repo, HEADERS)

    print(f"YOUR SITE WILL BE UPDATED IN SOME TIME ON {OWNER}.github.io/{repo}\n")
