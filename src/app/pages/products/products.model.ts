export class Product {
    public title: string;
    public imagePath: string;
    public content: string;
    public price: number;
    public year: number;
    public chip: string;
    public SSD: string;
    public memory: string;
    public display: string;
    public quantity: number

    constructor(title: string, imagePath: string, content: string, price: number, year: number, 
        chip: string, SSD: string, memory: string, display: string, quantity: number = 1) 
    {
        this.title = title
        this.imagePath = imagePath
        this.content = content
        this.price = price
        this.year = year
        this.chip = chip
        this.SSD = SSD
        this.memory = memory
        this.display = display
        this.quantity = quantity
    }
}