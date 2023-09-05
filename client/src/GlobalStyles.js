import { createGlobalStyle } from "styled-components";

export const breakpoints = { tablet: "600px" };

export default createGlobalStyle`
        :root {
        --dodger-blue: #2191fbff;
        --rose-red: #ba274aff;
        --burgundy: #841c26ff;
        --celeste: #b2ece1ff;
        --tiffany-blue: #8cdedcff;

        --primary-color: var(--rose-red);
        --accent-bg-color: var(--tiffany-blue);
        --secondary-color: var(--dodger-blue);
        --page-horizontal-padding: 20px;
        --header-height: 50px;
        --max-content-width: 1200px;
        --font-family: 'Roboto', sans-serif;
        --user-img-width: 120px;
        --neutral-background: var(--celeste);
        --danger-color: var(--burgundy);
        --box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        --transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

    html, body {
        font-family: var(--font-family);
        font-weight: 300;
        line-height: 1.6;
    }

    body {
        background-color: var(--neutral-background);
        color: var(--primary-color);
        transition: var(--transition);
    }

    h1, h2, h3 {
      color: var(--secondary-color);
      font-weight: 500;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 36px;
    }
    h2 {
      font-size: 32px;
    }
    h3 {
      font-size: 28px;
    }

    a {
        color: var(--dodger-blue);
        text-decoration: none;
        transition: var(--transition);
        &:hover {
            color: var(--primary-color);
            text-decoration: underline;
        }
    }

    button {
        background-color: var(--rose-red);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: var(--box-shadow);
        transition: var(--transition);
        font-family: var(--font-family);
        &:hover {
            background-color: var(--dodger-blue);
            transform: translateY(-2px);
        }
        &:active {
            transform: translateY(0);
        }
    }

    textarea, select {
        border: 2px solid var(--tiffany-blue);
        padding: 10px 15px;
        border-radius: 5px;
        transition: var(--transition);
        font-family: var(--font-family);
        &:focus {
            border-color: var(--rose-red);
            box-shadow: 0 0 8px 0 var(--rose-red);
        }
    }

`;
