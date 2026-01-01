from abc import ABC, abstractmethod
class DoUong(ABC):
    def pha_do_uong(self):
        self.dun_nuoc()
        self.pha_che()
        self.rot_vao_coc()
        self.them_gia_vi()
    def dun_nuoc(self):print("Dun nuoc soi")
    @abstractmethod
    def pha_che(self):pass
    def rot_vao_coc(self):print("Rot do uong vao coc")
    def them_gia_vi(self):pass
class Tra(DoUong):
    def pha_che(self):print("Cho la tra vao nuoc soi")
    def them_gia_vi(self):print("Them chanh va duong")
class CaPhe(DoUong):
    def pha_che(self):print("Cho bot ca phe vao nuoc soi")
    def them_gia_vi(self):print("Them sua")
print("Pha tra:")
tra = Tra()
tra.pha_do_uong()
print("\nPha ca phe:")
caphe = CaPhe()
caphe.pha_do_uong()