/* eslint-disable react/no-unescaped-entities */
export default function CardPlayground() {
  return (
    <div className="grid gap-10 justify-center py-10 px-2">
      <section>
        <div className="jun-card max-w-sm overflow-hidden">
          <div className="jun-cardCover">
            <div className="jun-cardMedia">
              <img
                src="https://images.unsplash.com/photo-1529963183134-61a90db47eaf?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=1080&amp;q=80"
                alt="Iceland"
              />
            </div>
          </div>
          <div className="jun-cardCover bg-gradient-to-t from-black/80 to-transparent" />
          <div className="jun-cardContent relative z-10 text-white">
            <div className="mb-3">
              <svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 16 16"
                width="512"
                height="512"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  fill="currentColor"
                  d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963l-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882l-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646l-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8L3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237l-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646l-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963l.496-1.85a.5.5 0 1 1 .966.26l-.236.882l1.12-.646a.5.5 0 0 1 .5.866l-1.12.646l.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963l1.849-.495a.5.5 0 0 1 .259.966l-.883.237l1.12.646a.5.5 0 0 1-.5.866l-1.12-.646l.236.883a.5.5 0 1 1-.966.258l-.495-1.849l-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z"
                ></path>
              </svg>
            </div>
            <div className="flex items-center mb-2">
              <div className="text-4xl font-bold">Iceland</div>
            </div>
            <div className="text-lg">Winter 2020 • 8 days</div>
          </div>
        </div>
      </section>

      <section>
        <div className="jun-card max-w-sm overflow-hidden">
          <div className="jun-cardOverflow">
            <div className="jun-cardMedia">
              <video
                autoPlay={false}
                loop={false}
                src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
                poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
              >
                Sorry, your browser doesn't support embedded videos, but don't
                worry, you can
                <a href="https://archive.org/details/BigBuckBunny_124">
                  download it
                </a>
                and watch it with your favorite video player!
              </video>
            </div>
          </div>
          <div className="jun-cardContent p-2">
            <div className="text-sm text-muted-foreground mb-2">
              GET CREATIVE
            </div>
            <div className="text-2xl font-semibold leading-none tracking-tight mb-2">
              Make videos with your family
            </div>
            <div className="text-sm text-muted-foreground">
              Record and remember good times with your loved ones.
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="jun-card min-w-[300px] min-h-[360px] overflow-hidden">
          <div className="jun-cardCover">
            <div className="jun-cardMedia">
              <img
                src="https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$"
                alt="Person wearing Galaxy Buds"
                className="object-top"
              />
            </div>
          </div>
          <div className="jun-cardCover bg-gradient-to-t from-black/100 h-1/2 top-[unset] to-transparent" />
          <div className="jun-cardContent relative z-10 mt-auto text-white">
            <div className="text-2xl font-bold mb-1 mt-auto">
              Galaxy Buds 2019
            </div>
            <div className="text-lg">Perfect for everyone</div>
          </div>
        </div>
      </section>

      <section>
        <div className="jun-card max-w-md w-fit border-none shadow-[0px_14px_80px_rgba(34,35,58,0.2)] @min-[450px]:[--dir:var(--row,)]">
          <div className="jun-cardMedia ml-[var(--row,-48px)] mt-[var(--col,-48px)] bg-white rounded-xl">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2000px-Git_icon.svg.png"
              alt="Git logo"
            />
            <div className="jun-cardCover bg-[linear-gradient(147deg,rgb(254,138,57)_0%,rgb(253,56,56)_74%)] opacity-50"></div>
          </div>
          <div className="jun-cardContent">
            <div className="text-sm text-gray-600">28 MAR 2019</div>
            <div className="text-xl font-semibold mb-2">What is Git ?</div>
            <div className="text-base line-clamp-2">
              Git is a distributed version control system. Every dev has a
              working copy of the code and...
            </div>
            <div className="jun-cardActions mt-[unset]">
              <button className="px-4 py-2 text-white bg-[linear-gradient(147deg,rgb(254,138,57)_0%,rgb(253,56,56)_74%)] shadow-[0px_4px_32px_rgba(252,56,56,0.4)] rounded-full transition-colors text-sm font-medium">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center gap-4">
        <div className="jun-card max-w-sm overflow-hidden resize-y">
          <div
            className="jun-cardMedia"
            style={{ minHeight: "120px", maxHeight: "200px" }}
          >
            <img
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=300&h=169&q=80"
              alt="Beautiful Landscape"
            />
          </div>
          <div className="text-xl font-semibold mb-2">
            Breathtaking Landscape
          </div>
          <div className="text-base line-clamp-5">
            This card showcases a beautiful landscape image. It's a perfect
            example of how to display visual content with a title and
            description. Use this card component to highlight key information or
            features in your application.
          </div>
        </div>
        <div className="jun-card max-w-sm">
          <div className="text-xl font-semibold mb-2">
            Breathtaking Landscape
          </div>
          <div className="jun-cardMedia">
            <img
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=300&h=169&q=80"
              alt="Beautiful Landscape"
            />
          </div>
          <div className="text-base line-clamp-5">
            This card showcases a beautiful landscape image. It's a perfect
            example of how to display visual content with a title and
            description. Use this card component to highlight key information or
            features in your application.
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        <div className="jun-card max-w-sm">
          <div className="jun-cardOverflow jun-cardOverflow-rounded-none">
            <div className="jun-cardMedia">
              <img
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=300&h=169&q=80"
                alt="Beautiful Landscape"
              />
            </div>
          </div>
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">
              Breathtaking Landscape
            </div>
            <div className="text-base line-clamp-5">
              This card showcases a beautiful landscape image. It's a perfect
              example of how to display visual content with a title and
              description. Use this card component to highlight key information
              or features in your application.
            </div>
          </div>
        </div>
        <div className="jun-card max-w-sm">
          <div className="text-xl font-semibold mb-2">
            Breathtaking Landscape
          </div>
          <div className="jun-cardOverflow jun-cardOverflow-rounded-none">
            <div className="jun-cardMedia">
              <img
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=300&h=169&q=80"
                alt="Beautiful Landscape"
              />
            </div>
          </div>
          <div className="jun-cardContent">
            <div className="text-base line-clamp-5">
              This card showcases a beautiful landscape image. It's a perfect
              example of how to display visual content with a title and
              description. Use this card component to highlight key information
              or features in your application.
            </div>
          </div>
        </div>
        <div className="jun-card max-w-sm">
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">
              Breathtaking Landscape
            </div>
            <div className="text-base line-clamp-5">
              This card showcases a beautiful landscape image. It's a perfect
              example of how to display visual content with a title and
              description. Use this card component to highlight key information
              or features in your application.
            </div>
          </div>
          <div className="jun-cardOverflow jun-cardOverflow-rounded-none">
            <div className="jun-cardMedia">
              <img
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=300&h=169&q=80"
                alt="Beautiful Landscape"
              />
            </div>
          </div>
        </div>
        <div className="jun-card jun-card-row max-w-sm ">
          <div className="jun-cardOverflow jun-cardOverflow-rounded-none w-10">
            <div className="jun-cardMedia jun-cardMedia-minSize-[100px] jun-cardMedia-maxSize-[200px]">
              <img
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=300&h=169&q=80"
                alt="Beautiful Landscape"
              />
            </div>
          </div>
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">
              Breathtaking Landscape
            </div>
            <div className="text-base line-clamp-5">
              This card showcases a beautiful landscape image. It's a perfect
              example of how to display visual content with a title and
              description. Use this card component to highlight key information
              or features in your application.
            </div>
          </div>
        </div>
        <div className="jun-card jun-card-row max-w-sm ">
          <div className="text-xl font-semibold mb-2">
            Breathtaking Landscape
          </div>
          <div className="jun-cardOverflow jun-cardOverflow-rounded-none w-10">
            <div className="jun-cardMedia">
              <img
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=300&h=169&q=80"
                alt="Beautiful Landscape"
              />
            </div>
          </div>
          <div className="text-base line-clamp-5">
            This card showcases a beautiful landscape image. It's a perfect
            example of how to display visual content with a title and
            description. Use this card component to highlight key information or
            features in your application.
          </div>
        </div>
        <div className="jun-card jun-card-row max-w-sm ">
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">
              Breathtaking Landscape
            </div>
            <div className="text-base line-clamp-5">
              This card showcases a beautiful landscape image. It's a perfect
              example of how to display visual content with a title and
              description. Use this card component to highlight key information
              or features in your application.
            </div>
          </div>
          <div className="jun-cardOverflow w-10">
            <div className="jun-cardMedia">
              <img
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=300&h=169&q=80"
                alt="Beautiful Landscape"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        <div className="jun-card max-w-sm">
          <div className="jun-cardMedia">
            <video
              autoPlay
              loop
              muted
              poster="https://assets.codepen.io/6093409/river.jpg"
            >
              <source
                src="https://assets.codepen.io/6093409/river.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">
              Breathtaking Landscape
            </div>
            <div className="text-base line-clamp-5">
              This card showcases a beautiful landscape image. It's a perfect
              example of how to display visual content with a title and
              description. Use this card component to highlight key information
              or features in your application.
            </div>
          </div>
        </div>
        <div className="jun-card jun-card-row max-w-sm">
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">
              Breathtaking Landscape
            </div>
            <div className="text-base line-clamp-5">
              This card showcases a beautiful landscape image. It's a perfect
              example of how to display visual content with a title and
              description. Use this card component to highlight key information
              or features in your application.
            </div>
          </div>
          <div className="jun-cardOverflow jun-cardOverflow-rounded-none w-10">
            <div className="jun-cardMedia">
              <video
                autoPlay
                loop
                muted
                poster="https://assets.codepen.io/6093409/river.jpg"
              >
                <source
                  src="https://assets.codepen.io/6093409/river.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        <div className="jun-card max-w-sm">
          <div className="jun-cardMedia">
            <picture>
              <source
                media="(max-width: 600px)"
                srcSet="https://responsive-images-art-direction.glitch.me/flower-square.jpg"
              />
              <source
                media="(max-width: 1023px)"
                srcSet="https://responsive-images-art-direction.glitch.me/flower-rectangle.jpg"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="https://responsive-images-art-direction.glitch.me/flower-large.jpg"
              />
              <img src="flower-large.jpg" />
            </picture>
          </div>
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">
              Breathtaking Landscape
            </div>
            <div className="text-base line-clamp-5">
              This card showcases a beautiful landscape image. It's a perfect
              example of how to display visual content with a title and
              description. Use this card component to highlight key information
              or features in your application.
            </div>
          </div>
        </div>
        <div className="jun-card jun-card-row max-w-sm">
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">
              Breathtaking Landscape
            </div>
            <div className="text-base line-clamp-5">
              This card showcases a beautiful landscape image. It's a perfect
              example of how to display visual content with a title and
              description. Use this card component to highlight key information
              or features in your application.
            </div>
          </div>
          <div className="jun-cardOverflow jun-cardOverflow-rounded-none w-10">
            <div className="jun-cardMedia">
              <picture>
                <source
                  media="(max-width: 600px)"
                  srcSet="https://responsive-images-art-direction.glitch.me/flower-square.jpg"
                />
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://responsive-images-art-direction.glitch.me/flower-rectangle.jpg"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://responsive-images-art-direction.glitch.me/flower-large.jpg"
                />
                <img src="flower-large.jpg" />
              </picture>
            </div>
          </div>
        </div>
      </section>

      <section className="sb-unstyled demo-container flex flex-wrap items-center justify-center gap-4">
        <div className="jun-card max-w-64 h-72 flex flex-col">
          <div className="jun-cardCover">
            <div className="jun-cardMedia">
              <img
                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?fit=crop&w=300&h=200&q=80"
                alt="Breaking News"
              />
            </div>
          </div>
          <div className="jun-cardCover bg-gradient-to-t from-black/80 to-transparent" />
          <div className="jun-cardContent relative z-10 justify-end text-white">
            <button className="absolute top-2 right-2 text-white hover:text-red-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <div className="text-2xl font-bold mb-2">Breaking News</div>
            <div className="text-base line-clamp-3">
              A major breakthrough has been announced in renewable energy
              technology, promising to revolutionize the way we power our homes
              and cities. Scientists claim this could be the key to combating
              climate change.
            </div>
          </div>
        </div>
        <div className="jun-card max-w-64 h-72 flex flex-col">
          <div className="jun-cardCover">
            <div className="jun-cardMedia">
              <video
                autoPlay
                loop
                muted
                poster="https://assets.codepen.io/6093409/river.jpg"
              >
                <source
                  src="https://assets.codepen.io/6093409/river.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
          <div className="jun-cardCover bg-gradient-to-t from-black/80 to-transparent" />
          <div className="jun-cardContent relative z-10 justify-end text-white">
            <button className="absolute top-2 right-2 text-white hover:text-red-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <div className="text-2xl font-bold mb-2">Breaking News</div>
            <div className="text-base line-clamp-3">
              A major breakthrough has been announced in renewable energy
              technology, promising to revolutionize the way we power our homes
              and cities. Scientists claim this could be the key to combating
              climate change.
            </div>
          </div>
        </div>
      </section>

      <section className="sb-unstyled demo-container flex flex-wrap items-center justify-center gap-4">
        <div className="jun-card max-w-64">
          <div className="jun-cardMedia">
            <img
              src="https://images.unsplash.com/photo-1682686581498-5e85c7228119?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=169&q=80"
              alt="Scenic mountain landscape"
            />
          </div>
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">
              <a href="#">
                Mountain Retreat
                <div className="jun-cardOverlay jun-cardOverlay-interactive" />
              </a>
            </div>
            <div className="text-base line-clamp-5">
              Discover the serenity of our mountain getaway. Perfect for nature
              lovers and adventure seekers alike. Breathtaking views and fresh
              air await you.
            </div>
          </div>
        </div>
        <div className="jun-card max-w-64">
          <div className="jun-cardMedia">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=169&q=80"
              alt="Team collaboration"
            />
          </div>
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">Project Management</div>
            <div className="text-base line-clamp-5">
              Streamline your workflow with our intuitive project management
              tools. Boost productivity and collaboration.
            </div>
            <button className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
              <span>Delete Project</span>
              <div className="jun-cardOverlay jun-cardOverlay-interactive" />
            </button>
          </div>
        </div>
      </section>

      <section className="sb-unstyled demo-container flex items-center justify-center gap-4">
        <div className="jun-card max-w-[240px] p-6">
          <div className="jun-cardContent">
            <div className="text-lg font-semibold mb-2">
              Bring your app built with shadcn to life on Vercel
            </div>
            <div className="mb-4">
              Trusted by OpenAI, Sonos, Chick-fil-A, and more.
            </div>
            <div className="mb-4">
              Vercel provides tools and infrastructure to deploy apps and
              features at scale.
            </div>
            <button className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors">
              Deploy Now
              <div className="jun-cardOverlay" />
            </button>
          </div>
        </div>
      </section>

      <section className="sb-unstyled demo-container flex flex-wrap items-center justify-center gap-4">
        <div className="jun-card max-w-sm">
          <div className="jun-cardMedia">
            <img
              src="https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80"
              alt="City skyline"
            />
          </div>
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">
              Urban Explorer Package
            </div>
            <div className="text-base line-clamp-5">
              Discover the hidden gems of the city with our curated tour
              package. From iconic landmarks to local hotspots, experience the
              best of urban life.
            </div>
          </div>
          <div className="jun-cardActions jun-cardActions-equalSize">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Book Now
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        <div className="jun-card jun-card-row max-w-2xl">
          <div className="jun-cardMedia">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80"
              alt="Cozy restaurant interior"
            />
          </div>
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">
              Gourmet Dining Experience
            </div>
            <div className="text-base line-clamp-2">
              Indulge in a culinary journey at our award-winning restaurant. Our
              expert chefs craft exquisite dishes using locally-sourced
              ingredients, offering a perfect blend of tradition and innovation.
            </div>
            <div className="jun-cardActions">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Reserve a Table
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                View Menu
              </button>
            </div>
          </div>
        </div>
        <div className="jun-card jun-card-row max-w-2xl">
          <div className="jun-cardMedia">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80"
              alt="Cozy restaurant interior"
            />
          </div>
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">
              Gourmet Dining Experience
            </div>
            <div className="text-base line-clamp-2">
              Indulge in a culinary journey at our award-winning restaurant. Our
              expert chefs craft exquisite dishes using locally-sourced
              ingredients, offering a perfect blend of tradition and innovation.
            </div>
          </div>
          <div className="jun-cardActions justify-center jun-cardActions-col">
            <button className="px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              Reserve a Table
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              View Menu
            </button>
          </div>
        </div>
      </section>

      <section className="sb-unstyled demo-container flex items-center justify-center gap-4">
        <div className="jun-card" style={{ maxWidth: "400px" }}>
          <div className="jun-cardContent">
            <div className="text-xl font-semibold mb-2">
              <a href="#">
                Alice Smith
                <div className="jun-cardOverlay jun-cardOverlay-interactive"></div>
              </a>
            </div>
            <div className="text-sm text-gray-600">about 1 year ago</div>
            <div className="text-base line-clamp-2">Re: Project Update</div>
            <div className="text-base line-clamp-5">
              Thank you for the project update. It looks great! I've gone
              through the report, and th...
            </div>
            <div className="jun-cardActions">
              <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded">
                work
              </button>
              <button className="px-3 py-1 bg-gray-700 text-white rounded">
                important
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="sb-unstyled demo-container flex items-center justify-center gap-4">
        <div className="jun-card max-w-md p-6">
          <div className="text-xl font-semibold mb-2">Notifications</div>
          <div className="text-base line-clamp-5">
            Choose what you want to be notified about.
          </div>

          <div className="jun-cardContent space-y-4 mt-4">
            <div className="flex items-center">
              <div className="text-2xl mr-4">🔔</div>
              <div>
                <div className="text-base font-semibold">Everything</div>
                <div className="text-base line-clamp-5">
                  Email digest, mentions & all activity.
                </div>
              </div>
            </div>

            <div className="flex items-center bg-gray-100 p-2 rounded-md">
              <div className="text-2xl mr-4">👤</div>
              <div>
                <div className="text-base font-semibold">Available</div>
                <div className="text-base line-clamp-5">
                  Only mentions and comments.
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="text-2xl mr-4">🚫</div>
              <div>
                <div className="text-base font-semibold">Ignoring</div>
                <div className="text-base line-clamp-5">
                  Turn off all notifications.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
