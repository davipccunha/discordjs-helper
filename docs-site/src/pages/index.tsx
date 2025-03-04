import { Redirect } from '@docusaurus/router';
import { JSX } from 'react';

export default function Home(): JSX.Element {
  return <Redirect to="/discordjs-helper/docs/intro" />;
}