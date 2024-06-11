import{c as _,r as n,u as g,a as N,j as e,B as f}from"./index-CQRie-QK.js";import{u as k}from"./useLayout-DJYthvYo.js";import{P as q,S as o}from"./ProductService-OyHgk80s.js";import{u as y}from"./index.esm-CD4FniY2.js";import{T as c}from"./TextFieldController-LHNQP8KI.js";const T="_addHeader_uikql_148",C="_addTitle_uikql_160",S="_add_uikql_148",F="_wrapper_uikql_166",A="_addForm_uikql_170",I="_block_uikql_180",B="_block__content_uikql_212",M="_contactForm_uikql_220",H="_title_uikql_234",w="_subtitle_uikql_245",E="_spec_uikql_262",R="_elem_uikql_275",P="_bodies_uikql_308",D="_active_uikql_332",s={addHeader:T,addTitle:C,add:S,wrapper:F,addForm:A,block:I,block__content:B,contactForm:M,title:H,subtitle:w,spec:E,elem:R,bodies:P,active:D},K=()=>{const{handleSubmit:l,formState:{errors:a},control:i}=y({mode:"onChange"}),d=_(),m=r=>{try{q.postProduct(r.type.value,r.name,r.desc,!0,r.brand,r.body.value,r.color,r.model,r.price,r.year,r.generation,r.gear,r.fuel,r.drive),d("/main")}catch(u){console.log(u)}};return n.useMemo(()=>({errors:a,onSubmit:m,control:i,handleSubmit:l}),[a])},b="/vmt-motors-client/assets/coupe-B_2wRnqL.png",U="/vmt-motors-client/assets/universal-jOUockjK.png",L="/vmt-motors-client/assets/hatchback-CR4vAhWB.png",O="/vmt-motors-client/assets/roadster-Bag0VzcK.png",Y="/vmt-motors-client/assets/liftback-wANZqfbs.png",z="/vmt-motors-client/assets/sedan-CHE8fSCj.png",G="/vmt-motors-client/assets/offroad-1Sobsv0-.png",V="/vmt-motors-client/assets/compact-DDK_B8AR.png",W="/vmt-motors-client/assets/cabriolet-BpoFktlX.png",ee=()=>{k();const{t:l}=g(),{errors:a,control:i}=K(),{brands:d,driveUnits:m,colors:r,fuels:u,gears:h,types:v}=N(t=>t.FilterReducer),[j]=n.useState([{img:b,value:"coupe",label:"Coupe"},{img:U,value:"universal",label:"Universal"},{img:L,value:"hatchback",label:"Hatchback"},{img:O,value:"roadster",label:"Roadster"},{img:Y,value:"liftback",label:"Liftback"},{img:b,value:"crossover",label:"Crossover"},{img:z,value:"sedan",label:"Sedan"},{img:G,value:"offroad",label:"Offroad"},{img:V,value:"compact",label:"Compact"},{img:W,value:"cabriolet",label:"Cabriolet"}]),[p,x]=n.useState(null);return n.useEffect(()=>{},[]),e.jsxs("div",{className:s.add,children:[e.jsx("div",{className:s.addHeader,children:e.jsx("h3",{className:s.addTitle,children:l("submit_your_ad")})}),e.jsx("div",{className:s.wrapper,children:e.jsxs("div",{className:s.addForm,children:[e.jsx("h4",{className:s.title,children:l("choose_brand")}),e.jsxs("div",{className:s.block,children:[e.jsx(c,{control:i,errors:a,fieldType:"input",label:"Name",name:"name",placeholder:"Name",rules:{required:"Name is required"}}),e.jsx(o,{control:i,errors:a,name:"brand",options:d,placeholder:"Car brand",isMulti:!1,rules:{required:"Brand is required"}}),e.jsx(c,{control:i,errors:a,name:"model",fieldType:"input",label:"Car model",rules:{required:"Model is required"}})]}),e.jsx("h4",{className:s.title,children:l("specifications")}),e.jsxs("div",{className:[s.block,s.spec].join(" "),children:[e.jsxs("div",{className:s.elem,children:[e.jsx("h5",{className:s.subtitle,children:l("year_of_release")}),e.jsx(c,{control:i,errors:a,fieldType:"input",label:"Year of release",name:"year",rules:{required:"Year is required"}})]}),e.jsxs("div",{className:s.elem,children:[e.jsx("h5",{className:s.subtitle,children:l("transmission")}),e.jsx(o,{control:i,errors:a,placeholder:"Transmission type",name:"type",rules:{required:"Transmission type is required"},options:v,isMulti:!1})]}),e.jsxs("div",{className:s.elem,children:[e.jsx("h5",{className:s.subtitle,children:l("mileage")}),e.jsx(c,{control:i,errors:a,fieldType:"input",label:"Car mileage",name:"mileage",rules:{required:"Car mileage is required"}})]})]}),e.jsxs("div",{className:s.block,children:[e.jsx("h5",{className:s.subtitle,children:l("body")}),e.jsx("ul",{className:s.bodies,children:j.map(t=>e.jsxs("li",{className:[s.body,t.value===(p==null?void 0:p.value)?s.active:""].join(" "),onClick:()=>x(t),children:[e.jsx("img",{className:s.body__img,src:t.img,alt:""}),e.jsx("h6",{className:s.body__name,children:t.label})]},t.value))})]}),e.jsx("div",{className:s.block,children:e.jsx("h5",{className:s.subtitle,children:l("photo")})}),e.jsxs("div",{className:s.block,children:[e.jsx("h5",{className:s.subtitle,children:l("generation")}),e.jsx(c,{control:i,errors:a,fieldType:"input",label:l("generation"),name:"generation"})]}),e.jsxs("div",{className:[s.block,s.spec].join(" "),children:[e.jsxs("div",{className:s.elem,children:[e.jsx("h5",{className:s.subtitle,children:l("engine")}),e.jsx(o,{control:i,errors:a,name:"fuel",rules:{required:"Engine is required"},isMulti:!1,options:u,placeholder:l("engine")})]}),e.jsxs("div",{className:s.elem,children:[e.jsx("h5",{className:s.subtitle,children:l("gear")}),e.jsx(o,{control:i,errors:a,name:"gear",rules:{required:"Gear is required"},isMulti:!1,options:h,placeholder:l("gear")})]}),e.jsxs("div",{className:s.elem,children:[e.jsx("h5",{className:s.subtitle,children:l("drive")}),e.jsx(o,{control:i,errors:a,name:"drive",rules:{required:"Drive is required"},isMulti:!1,options:m,placeholder:l("drive")})]}),e.jsxs("div",{className:s.elem,children:[e.jsx("h5",{className:s.subtitle,children:l("color")}),e.jsx(o,{control:i,errors:a,name:"mileage",rules:{required:"Car mileage is required"},placeholder:l("color"),isMulti:!1,options:r})]})]}),e.jsxs("div",{className:s.block,children:[e.jsx("h5",{className:s.subtitle,children:l("desc")}),e.jsx(c,{control:i,errors:a,fieldType:"textarea",label:l("desc"),name:"desc"})]}),e.jsxs("div",{className:s.block,children:[e.jsx("h5",{className:s.subtitle,children:l("contact")}),e.jsx("div",{className:s.block__content,children:e.jsxs("form",{className:s.contactForm,children:[e.jsx(c,{control:i,errors:a,fieldType:"input",label:"Phone number",name:"phoneNumber"}),e.jsx(c,{control:i,errors:a,fieldType:"input",label:"Adress",name:"adress"}),e.jsx(c,{control:i,errors:a,fieldType:"input",label:"Email",name:"email"})]})})]}),e.jsxs("div",{className:s.block,children:[e.jsx("h5",{className:s.subtitle,children:l("price")}),e.jsx(c,{control:i,errors:a,fieldType:"input",label:l("price"),name:"price"}),e.jsx(f,{type:"submit",title:l("place_ad"),children:l("place_ad")})]})]})})]})};export{ee as default};
