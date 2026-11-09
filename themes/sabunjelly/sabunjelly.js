


/** require object and method -- sabunjelly.init */
window.sabunjelly=window.sabunjelly||{
  version:'1.0.1',
  uri:'https://sabunjelly.com/',
  init:function(){
    ForceWebsite.slideHeadLoader(1,100);
    var files=[
      "oldweb.js",
    ];
    ForceWebsite.theme.loadFiles(files,true);
    setTimeout(e=>{
      ForceWebsite.Force.onFunctionReady('OldWeb',r=>{
        if(!r){
          alert('Error: Failed to load OldWeb library.');
          return;
        }ForceWebsite.theme.putHTML(ForceWebsite.theme.content);
      });
    },(100*files.length)+500);
  },
  foot:function(){
    var id='sabunjelly-foot-loader',
    con=sabunjelly.loader(id);
    ForceWebsite.fetch('website.select',function(r){
      if(!Array.isArray(r)){
        ForceObject.splash('Error: Failed to fetch data.');
        return;
      }
      var col=document.getElementById(id),
      url=ForceWebsite.imageURL(ForceWebsite.theme.config.data.foot),
      img='<img src="'+url+'" />\n\n';
      col.parentElement.innerHTML=img+atob(r[0].content);
    },{id:ForceWebsite.theme.config.data.foot});
    return con;
  },
  load:function(query,post,bulk){
    var ow=new OldWeb,
    id='page-loader',
    body=document.getElementById('body');
    if(query.hasOwnProperty('p')){
      var pcon=ow.pageContent(post);
      if(pcon){return pcon.outerHTML;}
      return 'Not Found...';
    }
    var pcon=ow.bulkContent(bulk);
    if(pcon){
      setTimeout(e=>{
        sabunjelly.more('bulk-button-more');
      },50);
      return pcon.outerHTML;
    }return 'Nothing...';
  },
  loader:function(id){
    return '<div class="page-content-loader" id="'+id+'">'
      +'<img src="'
      +ForceWebsite.theme.path+'images/default.loader.gif'
      +'" /> Loading...'
      +'</div>';
  },
  more:function(id){
    var limit=ForceWebsite.theme.config.data.limit||10,
    butMore=document.getElementById(id);
    if(!butMore){return;}
    butMore.addEventListener('click',function(e){
      var rowCount=parseInt(this.dataset.count),
      rowTotal=parseInt(this.dataset.total),
      rowLimit=limit+rowCount;
      for(var i=0;i<limit;i++){
        rowCount++;
        var be=document.getElementById('bulk-each-'+rowCount);
        if(be){
          be.classList.remove('bulk-hide');
        }
      }
      if(rowCount>=rowTotal){
        var tp=this.parentElement;
        tp.parentElement.removeChild(tp);
        return;
      }
      this.dataset.count=rowCount+'';
    },false);
  },
};


