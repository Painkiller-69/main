class Rectangle {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
  
    constructor(x: number, y: number, width: number, height: number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    public getHeight(): number {
      return this.height;
    }
  
    public getWidth(): number {
      return this.width;
    }
  
    public getX(): number {
      return this.x;
    }
  
    public getY(): number {
      return this.y;
    }
  
    public toString(): string {
      return `Rectangle[x=${this.x},y=${this.y},width=${this.width},height=${this.height}]`;
    }
  }
  