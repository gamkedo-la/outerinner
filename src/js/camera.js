// possibles axis to move the camera
var AXIS = {
    NONE: "none", 
    HORIZONTAL: "horizontal", 
    VERTICAL: "vertical", 
    BOTH: "both"
};

// Camera constructor
function Camera(xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight)
{
    // position of camera (left-top coordinate)
    this.xView = xView || 0;
    this.yView = yView || 0;
    
    // distance from followed object to border before camera starts move
    this.xDeadZone = 0; // min distance to horizontal borders
    this.yDeadZone = 0; // min distance to vertical borders
    
    // viewport dimensions
    this.wView = canvasWidth;
    this.hView = canvasHeight;			
    
    // allow camera to move in vertical and horizontal axis
    this.axis = AXIS.BOTH;	

    // object that should be followed
    this.followed = null;
    
    // rectangle that represents the viewport
    this.viewportRect ={ x:this.xView, y:this.yView, w:this.wView, h:this.hView };				
                        
    // rectangle that represents the world's boundary (room's boundary)
    this.worldRect = {x:0, y:0, w:worldWidth, h:worldHeight};			
}

// gameObject needs to have "x" and "y" properties (as world(or room) position)
Camera.prototype.follow = function(gameObject, xDeadZone, yDeadZone)
{		
    this.followed = gameObject;	
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
}					

Camera.prototype.update = function()
{
    // keep following the player (or other desired object)
    if(this.followed != null)
    {		
        if(this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH)
        {		
            // moves camera on horizontal axis based on followed object position
            if(this.followed.pos.x - this.xView  + this.xDeadZone > this.wView)
                this.xView = this.followed.xx - (this.wView - this.xDeadZone);
            else if(this.followed.pos.y  - this.xDeadZone < this.xView)
                this.xView = this.followed.xx  - this.xDeadZone;
            
        }
        if(this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH)
        {
            // moves camera on vertical axis based on followed object position
            if(this.followed.yy - this.yView + this.yDeadZone > this.hView)
                this.yView = this.followed.yy - (this.hView - this.yDeadZone);
            else if(this.followed.yy - this.yDeadZone < this.yView)
                this.yView = this.followed.yy - this.yDeadZone;
        }						
        
    }		
    
    // update viewportRect
   // this.viewportRect.set(this.xView, this.yView);
    
    // don't let camera leaves the world's boundary
    // if(!this.viewportRect.within(this.worldRect))
    // {
    //     if(this.viewportRect.left < this.worldRect.left)
    //         this.xView = this.worldRect.left;
    //     if(this.viewportRect.top < this.worldRect.top)					
    //         this.yView = this.worldRect.top;
    //     if(this.viewportRect.right > this.worldRect.right)
    //         this.xView = this.worldRect.right - this.wView;
    //     if(this.viewportRect.bottom > this.worldRect.bottom)					
    //         this.yView = this.worldRect.bottom - this.hView;
    // }
    
}	

export default Camera