export default function SearchIcon({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      data-sentry-element="svg"
      data-sentry-component="SBIconSearch"
      data-sentry-source-file="SearchIcon.tsx"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.3062 5.69763C19.2358 8.62766 19.2358 13.3782 16.3062 16.3082C13.3766 19.2382 8.62672 19.2382 5.69711 16.3082C2.76749 13.3782 2.76749 8.62766 5.69711 5.69763C8.62672 2.7676 13.3766 2.7676 16.3062 5.69763ZM17.8763 16.8156C20.873 13.2784 20.7032 7.97378 17.3668 4.63689C13.8514 1.12104 8.15188 1.12104 4.63652 4.63689C1.12116 8.15275 1.12116 13.8531 4.63652 17.3689C7.97367 20.7066 13.2792 20.8758 16.8159 17.8765L21.4239 22.4852C21.7168 22.7781 22.1916 22.7781 22.4845 22.4852C22.7774 22.1923 22.7774 21.7174 22.4845 21.4245L17.8763 16.8156Z"
        fill={color}
        data-sentry-element="path"
        data-sentry-source-file="SearchIcon.tsx"
      ></path>
    </svg>
  );
}
