const fs = require('fs');
const path = require('path');

function mkdirp(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createFile(filePath, content = '') {
  fs.writeFileSync(filePath, content, 'utf8');
}

function parentIndexLink(depth) {
  if (depth === 1 || depth === 2 || depth === 3) {
    return '## Parent\n[[../Index]]\n';
  }
  return '';
}

function createIndexContent(title, depth, children) {
  let content = `# ${title}\n\n`;
  content += parentIndexLink(depth);
  if (children && children.length > 0) {
    content += `\n## Children\n`;
    children.forEach(child => {
      if (child.type === 'folder') {
        content += `- [[${child.name}/Index]]\n`;
      } else if (child.type === 'file') {
        content += `- [[${child.name}]]\n`;
      }
    });
  }
  return content;
}

// -------------------------------------
// 구조 정의
// -------------------------------------

// 100000번대
const csFundamentals = {
  name: '100000_CS_ProgrammingFundamentals',
  depth: 1,
  children: [
    {
      name: '110000_CS_Theory', depth: 2, children: [
        {
          name: '111000_DataStructures', depth: 3, children: [
            { type: 'file', name: '111100_Array.md' },
            { type: 'file', name: '111200_LinkedList.md' },
            { type: 'file', name: '111300_StackQueue.md' },
            { type: 'file', name: '111400_TreesGraphs.md' },
          ]
        },
        {
          name: '112000_Algorithms', depth: 3, children: [
            { type: 'file', name: '112100_SortingAlgorithms.md' },
            { type: 'file', name: '112200_SearchAlgorithms.md' },
            { type: 'file', name: '112300_DynamicProgrammingBasics.md' },
          ]
        },
        {
          name: '113000_OS_NetworkingBasics', depth: 3, children: [
            { type: 'file', name: '113100_OSConcepts_ProcessesThreads.md' },
            { type: 'file', name: '113200_TCP_IP_HTTPBasics.md' },
          ]
        }
      ]
    },
    {
      name: '120000_ProgrammingLanguages', depth: 2, children: [
        {
          name: '121000_C_Language', depth: 3, children: [
            { type: 'file', name: '121100_PointersMemoryManagement.md' }
          ]
        },
        {
          name: '122000_Python', depth: 3, children: [
            { type: 'file', name: '122100_BasicSyntaxBuiltins.md' }
          ]
        },
        {
          name: '123000_JavaScript', depth: 3, children: [
            { type: 'file', name: '123100_ScopeClosureAsync.md' },
            { type: 'file', name: '123200_ES6_Modules.md' },
          ]
        },
        {
          name: '124000_TypeScript', depth: 3, children: [
            { type: 'file', name: '124100_TypeSystemInterfaces.md' },
            { type: 'file', name: '124200_GenericsDecorators.md' },
          ]
        },
      ]
    }
  ]
};

// 200000번대: Frontend
const frontend = {
  name: '200000_Frontend',
  depth: 1,
  children: [
    {
      name: '210000_WebFundamentals', depth: 2, children: [
        {
          name: '211000_HTML', depth: 3, children: [
            { type: 'file', name: '211100_SemanticMarkup.md' }
          ]
        },
        {
          name: '212000_CSS', depth: 3, children: [
            { type: 'file', name: '212100_Layout_FlexGrid.md' }
          ]
        },
        {
          name: '213000_DOM_BrowserAPI', depth: 3, children: [
            { type: 'file', name: '213100_Events_Handlers.md' }
          ]
        }
      ]
    },
    {
      name: '220000_JavaScriptInBrowser', depth: 2, children: [
        {
          name: '221000_Perf_Accessibility', depth: 3, children: [
            { type: 'file', name: '221100_Debounce_Throttle.md' },
            { type: 'file', name: '221200_ARIA_Accessibility.md' }
          ]
        },
        {
          name: '222000_Testing_Linting', depth: 3, children: [
            { type: 'file', name: '222100_Jest_Basics.md' },
            { type: 'file', name: '222200_ESLint_Setup.md' }
          ]
        }
      ]
    },
    {
      name: '230000_Tooling_Bundlers', depth: 2, children: [
        {
          name: '231000_Webpack_Babel', depth: 3, children: [
            { type: 'file', name: '231100_TreeShaking.md' },
            { type: 'file', name: '231200_CodeSplitting.md' }
          ]
        },
        {
          name: '232000_Vite_Parcel', depth: 3, children: [
            { type: 'file', name: '232100_FastBuildSetup.md' }
          ]
        }
      ]
    },
    {
      name: '240000_Frameworks_Libraries', depth: 2, children: []
    },
    {
      name: '241000_NoFrameworkFrontend', depth: 3, children: [
        { type: 'file', name: '241100_BookBasedLearning.md' }
      ]
    },
    {
      name: '250000_React', depth: 2, children: [
        {
          name: '251000_ReactFundamentals', depth: 3, children: [
            { type: 'file', name: '251100_JSX_Components.md' },
            { type: 'file', name: '251200_Hooks_StateMgmt.md' }
          ]
        },
        {
          name: '252000_ReactOpenSourceAnalysis', depth: 3, children: [
            { type: 'file', name: '252100_ReactCoreInternal.md' },
            { type: 'file', name: '252200_VirtualDOM_Implementation.md' }
          ]
        },
        {
          name: '253000_ReactCloneCoding', depth: 3, children: [
            { type: 'file', name: '253100_MiniReactImplementation.md' },
            { type: 'file', name: '253200_PerformanceBenchmark.md' }
          ]
        },
        {
          name: '254000_React_OfficialDocsAnalysis', depth: 3, children: [
            { type: 'file', name: '254100_ReactDocs_Reading.md' },
            { type: 'file', name: '254200_ReactDocs_DeepAnalysis.md' }
          ]
        }
      ]
    },
    // 테스트 도구만 모아두는 범주
    {
      name: '260000_FrontendTesting', depth: 2, children: [
        {
          name: '261000_UnitIntegrationTesting', depth: 3, children: [
            { type: 'file', name: '261100_JestBasics.md' },
            { type: 'file', name: '261200_VitestBasics.md' },
            { type: 'file', name: '261300_ReactTestingLibrary.md' }
          ]
        },
        {
          name: '263000_E2ETesting', depth: 3, children: [
            { type: 'file', name: '263100_CypressBasics.md' }
          ]
        }
      ]
    },
    // 새로 추가: 디자인 시스템 & 문서화
    {
      name: '270000_DesignSystem_Documentation', depth: 2, children: [
        {
          name: '271000_Storybook', depth: 3, children: [
            { type: 'file', name: '271100_StorybookBasics.md' },
            { type: 'file', name: '271200_StorybookForDocs.md' }
          ]
        },
        {
          name: '272000_Figma', depth: 3, children: [
            { type: 'file', name: '272100_FigmaBasics.md' },
            { type: 'file', name: '272200_FigmaComponents.md' },
            { type: 'file', name: '272300_FigmaPrototyping.md' }
          ]
        }
      ]
    }
  ]
};

// 700000번대
const softSkills = {
  name: '700000_SoftwareEngineering_SoftSkills',
  depth: 1,
  children: [
    {
      name: '710000_DevProcess', depth: 2, children: [
        {
          name: '711000_AgileScrum', depth: 3, children: [
            { type: 'file', name: '711100_SprintPlanning.md' },
            { type: 'file', name: '711200_Retrospective.md' }
          ]
        },
        {
          name: '712000_GitVersioning', depth: 3, children: [
            { type: 'file', name: '712100_BranchingStrategy.md' },
            { type: 'file', name: '712200_PRReviewGuidelines.md' }
          ]
        }
      ]
    },
    {
      name: '720000_Collaboration_Communication', depth: 2, children: [
        {
          name: '721000_CodeReviewCulture', depth: 3, children: [
            { type: 'file', name: '721100_ConstructiveFeedback.md' }
          ]
        },
        {
          name: '722000_Documentation_Sharing', depth: 3, children: [
            { type: 'file', name: '722100_Wiki_ArchitectureDecisionRecords.md' }
          ]
        }
      ]
    },
    {
      name: '730000_TimeManagement_GoalSetting', depth: 2, children: [
        {
          name: '731000_Prioritization', depth: 3, children: [
            { type: 'file', name: '731100_UrgencyImportanceMatrix.md' }
          ]
        },
        {
          name: '732000_OKR_SMARTGoals', depth: 3, children: [
            { type: 'file', name: '732100_MidLongTermPlanning.md' }
          ]
        }
      ]
    }
  ]
};

// 나머지 중분류까지만
const others = [
  {
    name: '300000_Backend', depth: 1, children: [
      { name: '310000_Servers_Runtime', depth: 2, children: [] },
      { name: '320000_Databases', depth: 2, children: [] },
      { name: '330000_API_Auth', depth: 2, children: [] }
    ]
  },
  {
    name: '400000_DevOps', depth: 1, children: [
      { name: '410000_CICD', depth: 2, children: [] },
      { name: '420000_Cloud', depth: 2, children: [] },
      { name: '430000_Containers_Orchestration', depth: 2, children: [] }
    ]
  },
  {
    name: '500000_Security', depth: 1, children: [
      { name: '510000_WebSecurityBasics', depth: 2, children: [] },
      { name: '520000_SecureCoding', depth: 2, children: [] }
    ]
  },
  {
    name: '600000_AI_Data', depth: 1, children: [
      { name: '610000_DataProcessing', depth: 2, children: [] },
      { name: '620000_MachineLearning', depth: 2, children: [] }
    ]
  },
  {
    name: '800000_Projects', depth: 1, children: [
      { name: '810000_ProfessionalProjects', depth: 2, children: [] },
      {
        name: '820000_SideProjects', depth: 2, children: [
          {
            name: '822000_DDara_Project', depth: 3, children: [
              { type: 'file', name: '822100_MapAPI_ComponentIntegration.md' },
              { type: 'file', name: '822200_RealTimeSocketTracking.md' },
              { type: 'file', name: '822300_Testing_Refactoring.md' },
              { type: 'file', name: '822400_EnvSetup_CI-CD.md' },
              { type: 'file', name: '822500_BackendSetup.md' }
            ]
          }
        ]
      },
      { name: '830000_Hackathons', depth: 2, children: [] }
    ]
  }
];

function createStructure(basePath, node) {
  const currentPath = path.join(basePath, node.name);
  mkdirp(currentPath);

  const folders = node.children.filter(ch => !ch.type);
  const files = node.children.filter(ch => ch.type === 'file');

  const childrenLinks = [];
  folders.forEach(f => {
    childrenLinks.push({type:'folder', name:f.name});
  });
  files.forEach(fi => {
    childrenLinks.push({type:'file', name:fi.name});
  });

  const indexContent = createIndexContent(node.name, node.depth, childrenLinks);
  createFile(path.join(currentPath, 'Index.md'), indexContent);

  folders.forEach(f => {
    createStructure(currentPath, f);
  });

  files.forEach(fi => {
    createFile(path.join(currentPath, fi.name));
  });
}

const vaultPath = path.join(process.cwd(), 'vault');
mkdirp(vaultPath);

const topChildren = [
  {type:'folder', name:'100000_CS_ProgrammingFundamentals'},
  {type:'folder', name:'200000_Frontend'},
  {type:'folder', name:'300000_Backend'},
  {type:'folder', name:'400000_DevOps'},
  {type:'folder', name:'500000_Security'},
  {type:'folder', name:'600000_AI_Data'},
  {type:'folder', name:'700000_SoftwareEngineering_SoftSkills'},
  {type:'folder', name:'800000_Projects'}
];
const topIndexContent = createIndexContent('vault', 0, topChildren);
createFile(path.join(vaultPath, 'Index.md'), topIndexContent);

createStructure(vaultPath, csFundamentals);
createStructure(vaultPath, frontend);
createStructure(vaultPath, softSkills);

others.forEach(o => {
  const basePath = path.join(vaultPath, o.name);
  mkdirp(basePath);

  const folderLinks = o.children.map(c=>({type:'folder', name:c.name}));
  const indexContent = createIndexContent(o.name, o.depth, folderLinks);
  createFile(path.join(basePath, 'Index.md'), indexContent);

  o.children.forEach(mid => {
    const midPath = path.join(basePath, mid.name);
    mkdirp(midPath);
    const midChildrenLinks = mid.children ? mid.children.map(s=> s.type==='file'?{type:'file',name:s.name}:{type:'folder',name:s.name}) : [];
    const midIndexContent = createIndexContent(mid.name, mid.depth, midChildrenLinks);
    createFile(path.join(midPath, 'Index.md'), midIndexContent);

    if(mid.children && mid.children.length > 0) {
      mid.children.forEach(s => {
        if(!s.type) {
          // folder
          const subPath = path.join(midPath, s.name);
          mkdirp(subPath);
          const subChildrenLinks = (s.children||[]).map(x=>({type:'file', name:x.name}));
          const subIndexContent = createIndexContent(s.name, s.depth, subChildrenLinks);
          createFile(path.join(subPath, 'Index.md'), subIndexContent);
          s.children.forEach(x=>createFile(path.join(subPath, x.name)));
        } else if(s.type === 'file') {
          // 파일 바로 생성
          createFile(path.join(midPath, s.name));
        }
      });
    }
  });
});

console.log('디렉토리 및 파일 구조(디자인 시스템 & Figma 추가) 생성 완료!');

