abstract class DoUong {
    public final void phaDoUong(){
        dunNuoc();
        phaChe();
        rotVaoCoc();
        themGiaVi();}
    protected void dunNuoc() {System.out.println("Dun nuoc soi");}
    protected abstract void phaChe();
    protected void rotVaoCoc() {System.out.println("Rot do uong vao coc");}
    protected void themGiaVi() {}
}
class Tra extends DoUong {
    @Override
    protected void phaChe() {System.out.println("Cho la tra vao nuoc soi");}
    @Override
    protected void themGiaVi() {System.out.println("Them chanh va duong");}
}
class CaPhe extends DoUong {
    @Override
    protected void phaChe() {System.out.println("Cho bot ca phe vao nuoc soi");}
    @Override
    protected void themGiaVi() {System.out.println("Them sua");}
}
public class Main {
    public static void main(String[] args) {
        System.out.println("Pha tra:");
        DoUong tra = new Tra();
        tra.phaDoUong();
        System.out.println("\nPha ca phe:");
        DoUong caPhe = new CaPhe();
        caPhe.phaDoUong();
    }
}