import UnderConstruction from "./UnderConstruction.jsx";

export default function Contributors({ display = true }) {
  const infoCards = [
    {
      title: "Andy Troung",
      text: "Front End Intern 2022",
      img: "images/contributors/andy_truong.jpeg",
      alt: "...",
    },
    {
      title: "Bishal Nayak",
      text: "Front End Intern 2022",
      img: "images/contributors/bishal_nayak.jpg",
      alt: "...",
    },
    {
      title: "Brandon Xu",
      text: "Front End Intern 2022",
      img: "images/contributors/brandon_xu.jpeg",
      alt: "...",
    },
    {
      title: "Camille Lerasan",
      text: "Front End Intern 2022",
      img: "images/contributors/camille_lerasan.jpeg",
      alt: "...",
    },
    {
      title: "Jerry Wu",
      text: "Front End Intern 2022",
      img: "images/contributors/jerry_wu.jpg",
      alt: "...",
    },
    {
      title: "Jose Hernandez",
      text: "Front End Intern 2022",
      img: "images/contributors/jose_hernandez.jpg",
      alt: "...",
    },
    {
      title: "Julia Lu",
      text: "Front End Intern 2022",
      img: "images/contributors/julia_lu.jpeg",
      alt: "...",
    },
    {
      title: "Kaier Lao",
      text: "Front End Intern 2022",
      img: "images/contributors/kaier_lao.jpeg",
      alt: "...",
    },
    {
      title: "Mayur Patil",
      text: "Front End Intern 2022",
      img: "images/contributors/mayur_patil.jpg",
      alt: "...",
    },
    {
      title: "Myron Zhou",
      text: "Front End Intern 2022",
      img: "images/contributors/myron_zhou.jpg",
      alt: "...",
    },
    {
      title: "Ramneet Sidhu",
      text: "Front End Intern 2022",
      img: "images/contributors/ramneet_sidhu.jpeg",
      alt: "...",
    },
    {
      title: "Rebecca Castro",
      text: "Front End Intern 2022",
      img: "images/contributors/rebecca_castro.jpeg",
      alt: "...",
    },
    {
      title: "Rembrandt Fernandez",
      text: "Front End Intern 2022",
      img: "images/contributors/rembrandt_fernandez.jpg",
      alt: "...",
    },
    {
      title: "Sophie Huang",
      text: "Front End Intern 2022",
      img: "images/contributors/sophie_huang.jpg",
      alt: "...",
    },
    {
      title: "ABC DEFG",
      text: "Front End Intern 2022",
      img: "images/contributors/placeholder_headshot.png",
      alt: "...",
    },
  ];

  if (display === false) {
    return (
      <UnderConstruction displayUnderConstruction={true}></UnderConstruction>
    );
  } else {
    return (
      <main className="container mx-auto mt-4 p-4">
        <div className="container max-h-full border-2 mx-auto mt-4 p-4">
          <h1 className="text-4xl text-left text-slate-700 font-medium mb-2 mx-6 mt-6 font-sans tracking-wide">
            Community Powered.
          </h1>
          <div className="p-4">
            <img
              src="/images/contributors/group_6207.jpg"
              alt="..."
              className="w-full"
            />
          </div>
          <p className="text-xl text-left font-medium mb-2 mx-6 font-sans tracking-wide text-slate-700">
            Civil Engineering is community based, so are we.
          </p>
        </div>
        <div className="container border-2 mx-auto mt-4 p-4">
          <h2 className="text-4xl text-left font-medium mt-6 mb-2 mx-6 font-sans tracking-wide text-slate-700">
            Contributors
          </h2>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {infoCards.map((item, index) => (
              <div
                key={`infoCard${index}`}
                className="container rounded-md border-2 mx-auto mt-4 p-4"
              >
                <div className="p-4">
                  <figure>
                    <img
                      className="w-60 rounded-full md:h-full flex m-auto pt-2"
                      alt={item.alt}
                      src={item.img}
                    />
                    <div className="mt-4">
                      <h2 className="font-medium font-sans tracking-wide text-xl text-slate-700">
                        {item.title}
                      </h2>
                      <p className="text-sm text-slate-700">{item.text}</p>
                    </div>
                  </figure>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container border-2 mx-auto mt-4 p-4">
          <h2 className="text-4xl text-left font-medium mt-6 mb-2 mx-6 font-sans tracking-wide text-slate-700">
            Leadership
          </h2>
          <div className="p-4 flex justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="container rounded-md border-2 mx-auto mt-4 p-4">
              <div className="p-4">
                <img
                  src="/images/contributors/ann_do.jpg"
                  alt="..."
                  className="w-60 rounded-full md:h-80 md:w-80 flex m-auto pt-2"
                />
                <div className="container rounded-md mx-auto mt-4 p-4">
                  <div className="p-4">
                    <h1 className="text-2xl font-sans tracking-wide text-slate-700">
                      Ann Do
                    </h1>
                    <p className="text-lg text-slate-700">Project Manager</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container rounded-md border-2 mx-auto mt-4 p-4">
              <div className="p-4">
                <img
                  src="/images/contributors/seij_de_leon.jpg"
                  alt="..."
                  className="w-60 rounded-full md:h-80 md:w-80 flex m-auto pt-2"
                />
                <div className="container rounded-md mx-auto mt-4 p-4">
                  <div className="p-4">
                    <h1 className="text-2xl font-sans tracking-wide text-slate-700">
                      Seij De Leon, PE
                    </h1>
                    <p className="text-lg text-slate-700">Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container items-center border-2 mx-auto mt-4 p-4">
          <h2 className="text-4xl text-left font-medium mt-6 mb-2 mx-6 text-slate-700 font-sans tracking-wide">
            Interested in Joining?
          </h2>
          <div className="container flex justify-center items-center mx-auto mt-4 p-4">
            <div className="flex flex-col justify-center md:w-8/12 md:h-8/12 relative border border-black border-opacity-20">
              <button className="flex justify-center items-center mx-auto mt-6 mb-6 py-6 w-52 h-20 bg-sky-400 hover:bg-sky-500 outline outline-offset-2 outline-slate-300 rounded-lg text-white font-bold font-sans tracking-wider">
                Click here to message
              </button>
              <div className="text-black text-2xl text-slate-700 font-sans tracking-wider p-4">
                California Seismic is an open source project with opportunities
                in technical writing, problem creation, front end development,
                video editing, and more! If you would like to learn more about
                ways you could contribute please reach out to Seij on LinkedIn.
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
