export class Document {
    public id: number;
    public name: string;
    public description: string;
    public url: string;
    public children: string;
  
    constructor(id: number, name: string, desc: string, url: string, children: string) {
      this.id = id;
      this.name = name;
      this.description = desc;
      this.url = url;
      this.children = children; 
    }
  }