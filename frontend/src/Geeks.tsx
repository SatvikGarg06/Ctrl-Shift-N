import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "./DeployButtons.css"
import requestHandler from "./utility/requestHandler";

// Import TypeScript mode
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
// Import themes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-dracula";

// Import autocomplete and snippets (optional)
import "ace-builds/src-noconflict/ext-language_tools";

import { XMLParser } from "fast-xml-parser";
import { FAKEXML,FAKEJSON } from "./utility/constants";

import { MessagesSection } from "../src/components/ui/messages-section"
import { PromptInput } from "../src/components/ui/prompt-input"
import { ExampleProjects } from "../src/components/ui/example-projects"
import { buildTree,updateFileContent,updateNodes } from "./utility/allForNodes";
import { runProcess } from "./utility/LLMCAlling";
import RandomId from "./check-extension";
import { checkIs,setCurrentItem as localsetCurrentIten,doDefault } from "./store/AppContext";
import animationData from "../src/components/ui/animation.json"
import Lottie from "lottie-react";

import {
  ChevronRight,
  ChevronDown,
  Folder,
  File,
  FileJson,
  FileText,
} from "lucide-react";

interface TreeItemProps {
  item: {
    name: string;
    type: "file" | "folder";
    children?: TreeItemProps["item"][];
  };
  level: number;
}


function TreeItem({ item, level,changeCode,finalCode,currentItem,setCurrentItem }) {
    //console.log((item)
    // //console.log(("change code")
    // //console.log((finalCode)
  const [isOpen, setIsOpen] = useState(false);
  const [content,setContent] = useState(item.content || "");
  const toggleOpen = (e) => {
    
    if (item.type === "folder") {
      setIsOpen(!isOpen);
    }else{
        // //console.log((changeCode.toString())
        // //console.log((content)
        // //console.log((finalCode)
        setCurrentItem(item)
        changeCode(content)
        // console.log("content")
        // console.log(content)
    }
  };

  const getIcon = () => {
    if (item.type === "folder") {
      return <Folder className="w-4 h-4 mr-1" />;
    }
    if (item.name.endsWith(".json")) {
      return <FileJson className="w-4 h-4 mr-1" />;
    }
    if (item.name.endsWith(".txt") || item.name.endsWith(".md")) {
      return <FileText className="w-4 h-4 mr-1" />;
    }
    return <File className="w-4 h-4 mr-1" />;
  };

  return (
    <>
      <div >
        <div
          className={`flex items-center py-1 px-2 hover:bg-gray-800 cursor-pointer`}
          style={{ paddingLeft: `${level * 12 + 4}px` }}
          onClick={toggleOpen}
          data-content={content}
        >
          {item.type === "folder" &&
            (isOpen ? (
              <ChevronDown className="w-4 h-4 mr-1" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-1" />
            ))}
          {getIcon()}
          <span className="text-sm text-white">{item.name}</span>
        </div>
        {item.type === "folder" && isOpen && item.children && (
          <div>
            {item.children.map((child, index) => (
              <TreeItem key={index} item={child} level={level + 1} changeCode={changeCode} currentItem={currentItem} finalCode={finalCode} setCurrentItem={setCurrentItem} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}


const Geeks: React.FC = () => {
  const [language, setLanguage] = useState<string>("javascript");
  const [theme, setTheme] = useState<string>("dracula");
  const [code, setCode] = useState<string>("// Type your TypeScript code here");
  const [mockFileStructure,setmockFileStructure] = useState([])
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [currentItem,setCurrentItem] = useState("")
  const [prompt,changePrompt]=useState('')
  const [chatMessage,SetChatMessage] = useState([])
  const [isPreviewClicked,setisPreviewClicked] = useState(true)
  const [isDeployClicked,setisDeployClicked] = useState(true)

  // useEffect(() => {
  //   if (isPreviewClicked) {
  //     let timer = setTimeout(() => setisPreviewClicked(false), 60000); 
  //   }

  // }, [isPreviewClicked]);

  // useEffect(() => {
  //   if (isDeployClicked) {
  //     let timer = setTimeout(() => setisDeployClicked(false), 60000); 
  //   }
  // }, [isPreviewClicked]);

    async function disablePreview() {
      
      let {uuid,useremail} = checkIs()
        console.log("called")
        alert("Preparing to Preview, Please Wait. By Default the Preview Runs on port 8010.")
        try {
          const response = await requestHandler(
            "POST",
            "/docker/",
            { data:JSON.stringify(mockFileStructure),id:uuid,email:useremail }
          );
          console.log("Response:", response);
          if(response.error){
            alert("some error occured")
          }
          // setisPreviewClicked(true)
          
          
        } catch (error) {
          console.error("Error in registerHandler:", error);
        }
        
      
    }

    async function disableDeploy() {
    
        alert("Please Wait, Deploying...")
        console.log("deploying")
        let {uuid,useremail} = checkIs()
      if(isPreviewClicked){
        // setisPreviewClicked(false)
        console.log("called")
        try {
          const response = await requestHandler(
            "POST",
            "/deploy/",
            {id:uuid,email:useremail }
          );
          console.log("Response:", response);
          // setisPreviewClicked(true)
          if(response.error){
            alert("some error occured")
          }
          
          
        } catch (error) {
          console.error("Error in registerHandler:", error);
        }
        
      }

      
    }


    function parseXml(XMLOBJ) {
        const options = {
            ignoreAttributes: false,
            attributeNamePrefix: "_", // attributes will have a leading underscore (e.g. _type, _filePath)
            cdataTagName: "__cdata",
            parseTagValue: true,
            trimValues: true,
          };
      
          const parser = new XMLParser(options);
          let finalFake = XMLOBJ.replace(/\'/g, "'").replace(/\"/g, '"').replace(/\`/g, '`').replace(/\$/g, '$');
          const jsonObj = parser.parse(finalFake);
          return jsonObj
          
    }

  async function GenerateResponse(finalPrompt) {
        console.log(finalPrompt)
        finalPrompt = String(finalPrompt)
        let returnedValue =  await runProcess(finalPrompt)
        console.log("printing returned value " + returnedValue)
        returnedValue = returnedValue.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\`/g, '`').replace(/\'/g, "'").replace(/\"/g, '"').replace(/\`/g, '`').replace(/\$/g, '$').replace(/&amp;/g, "&")
       returnedValue.replace("<","&lt;")
       returnedValue.replace(">","&gt;")
       
        console.log("returned value")
        console.log(returnedValue)
        let finalParsing = parseXml(returnedValue)
        console.log(finalParsing)
        let bolActionObject = finalParsing.boltArtifact.boltAction
        const tree = buildTree(bolActionObject);
        let finaJSONString = JSON.stringify(tree, null, 2);
        setmockFileStructure((prevValue)=>{return [...tree]})
        console.log("mockFiletruect")
        console.log(mockFileStructure)
        console.log(finaJSONString)
        
  }  

  useEffect(() => {
      let check = checkIs()
      if(check==false){
        location.href = "/login"
      }else{
        function generateRandomString(length = 60) {
          const characters = 'abcdefghijklmnopqrstuvwxyz';
          let result = '';
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
          }
          return result;
        }

        let result = generateRandomString()
        
        console.log("result",result)
        localsetCurrentIten("uuid",result)
      }


    
  }, [])
  

  useEffect(() => {

  
  
    const jsonObj = parseXml(FAKEXML);
    
    const allActions = jsonObj.boltArtifact.boltAction

    console.log("useEffect runs")
    console.log(allActions)
    let finalFakeJson = FAKEJSON.replace(/\'/g, "'").replace(/\"/g, '"').replace(/\`/g, '`').replace(/\$/g, '$')
    
    const tree = buildTree(allActions);
    let finaJSONString = JSON.stringify(tree, null, 2);
    // setmockFileStructure(tree)
    console.log(JSON.stringify(tree))

    
  }, []);
 
  const [messages,addMessage]= useState([
  
    {
      id: 2,
      role: "assistant",
      content: "I'll help you create a modern landing page. What's your startup about?",
    },
    {
      id: 3,
      role: "user",
      content: "It's an AI-powered productivity tool",
    },
  ])
  const AddMessage=(prompt)=>{
    const obj={id:4,role:"user",content:prompt}
    addMessage((prevValue)=>{return [...prevValue,obj]})
  }
  return (
    <div style={{backgroundColor:"black"}} className="grid grid-cols-3 md:grid-cols-[2fr_1fr_3fr] gap-4 p-4">

        <div>
        <div className="min-h-screen bg-gray-950">

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <MessagesSection prompt={prompt}></MessagesSection>
          <PromptInput changePrompt={changePrompt} prompt={prompt} genrateResponse={GenerateResponse} addmessage={AddMessage}></PromptInput>
          {/* <ExampleProjects /> */}
        </div>
      </main>
    </div>

            
        </div>
      <div className=" h-screen bg-gray-900 text-gray-300 p-2 overflow-auto">
        <h2 className="text-sm font-semibold mb-2 px-2">Explorer</h2>
        {mockFileStructure.map((item, index) => (
          <TreeItem key={index} item={item} level={0} finalCode={code} changeCode={setCode} currentItem={currentItem} setCurrentItem={setCurrentItem}/>
        ))}
        <center>
          <div id="div">
        <button style={{padding:"10px",marginTop:"10px"}} className="DeployButtons " onClick={disablePreview}>
          <b>Preview</b>
          
        </button>
        <button style={{padding:"10px",marginTop:"10px"}} onClick={disableDeploy} className="DeployButtons">
        <b>Deploy to the Server</b>
        
        </button>
        </div>
        </center>
      </div>

      <div>
        <AceEditor
          mode={language}
          theme={theme}
          value={code}
          onChange={(newValue) => {setCode(newValue); 
            // console.log(mockFileStructure)
            if(currentItem["_filePath"]){
                let updated = updateFileContent(mockFileStructure,currentItem["_filePath"],code)
                console.log(updated)
                setmockFileStructure(updated)
            }
            
          }}
          name="dynamic-editor"
          fontSize={17}
          width="50vw"
          height="100vh"
          setOptions={{
            enableBasicAutocompletion: true, // Basic autocompletion
            enableLiveAutocompletion: true, // Autocomplete as you type
            enableSnippets: true, // Code snippets support
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};

export default Geeks;