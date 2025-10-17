import { useQueryClient } from "@tanstack/react-query";

export const AdminNavigation = () => {
  const queryclient = useQueryClient();
  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryclient.invalidateQueries({ queryKey: ["user"] });
  };
  return (
    <button
      className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
      onClick={logout}
    >
      Cerrar Sesión
    </button>
  );
};
