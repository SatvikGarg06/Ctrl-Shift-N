


export  function updateNodes(nodes, parts, newContent) {
    // If no parts remain, return nodes as is.
    if (parts.length === 0) return nodes;
  
    // Process each node in the current level and build a new list.
    return nodes.map((node) => {
      // If the current node is a folder and its name matches the first part:
      if (node.type === "folder" && node.name === parts[0]) {
        // Create a new folder node with updated children.
        return {
          ...node,
          children:
            parts.length === 1
              ? node.children // no update if folder name is last part (shouldn't happen for file updates)
              : updateNodes(node.children, parts.slice(1), newContent),
        };
      } else if (
        node.type === "file" &&
        parts.length === 1 &&
        node.name === parts[0]
      ) {
        // For a file, if it's the one we want to update, return a new file node with updated content.
        return { ...node, content: newContent };
      }
      // Otherwise, return the node unchanged.
      return node;
    });
  }

  
 export  function updateFileContent(tree, filePath, newContent) {
    // Remove a leading slash if present, then split into parts.
    const parts = filePath.replace(/^\//, "").split("/");
  
    // Use a helper function to recursively update nodes.
    return updateNodes(tree, parts, newContent);
  }
  


  
export function buildTree(files) {
    const tree = [];
  
    // Helper: find a folder node in nodes by name.
    const findFolder = (nodes, name) =>
      nodes.find((node) => node.type === "folder" && node.name === name);
  
    // Helper: insert a node ensuring folders come before files.
    const insertNode = (nodes, node) => {
      if (node.type === "folder") {
        let insertIndex = nodes.findIndex((n) => n.type === "file");
        if (insertIndex === -1) insertIndex = nodes.length;
        nodes.splice(insertIndex, 0, node);
      } else {
        nodes.push(node);
      }
    };
  
    files.forEach((file) => {
      // Split the file path into parts, e.g., "src/index.css" => ["src", "index.css"]
      const parts = file._filePath.split("/");
  
      let currentLevel = tree;
  
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          // Last part: create a file node.
          const fileNode = {
            name: part,
            type: "file",
            _filePath: file._filePath, // include the file path value
            content: file["#text"] || "",
          };
          insertNode(currentLevel, fileNode);
        } else {
          // Intermediate parts: folders.
          let folder = findFolder(currentLevel, part);
          if (!folder) {
            folder = { name: part, type: "folder", children: [] };
            insertNode(currentLevel, folder);
          }
          currentLevel = folder.children;
        }
      });
    });
  
    return tree;
  }

