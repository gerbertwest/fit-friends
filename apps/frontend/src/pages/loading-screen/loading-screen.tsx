import Loader from 'react-ts-loaders'

function LoadingScreen(): JSX.Element {
  return (
    <div className="user-page">
      <section className="catalog">
        <h1>
          <Loader
          type='ring'
          color='blue'
          size={100}
          />
        </h1>
      </section>
    </div>
  );
}

export default LoadingScreen;
