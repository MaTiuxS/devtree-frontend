import type { SocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
  data: UserHandle;
};

const HandleData = ({ data }: HandleDataProps) => {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled
  );

  return (
    <div className="space-y-6 text-white">
      <p className="text-center font-black text-5xl">{data.handle}</p>
      {data.image && (
        <img
          src={data.image}
          className="max-w-[250px] max-h-[250px] mx-auto rounded-4xl"
        />
      )}
      <p className="text-lg text-center font-bold">{data.description}</p>
      <div className="mt-20 flex flex-col gap-6">
        {links.length ? (
          links.map((link) => (
            <a
              key={link.name}
              className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src={`/social/icon_${link.name}.svg`}
                alt="Imagen red social"
                className="w-12"
              />
              <p className="text-black capitalize text-lg font-bold">
                Vísita mi: {link.name}
              </p>
            </a>
          ))
        ) : (
          <p className="text-center">No hay enlaces en este perfil</p>
        )}
      </div>
    </div>
  );
};

export default HandleData;
