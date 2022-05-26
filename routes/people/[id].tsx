/** @jsx h */
import { h, PageProps } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";

interface People {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const handler: Handlers = {
  async GET(_, ctx) {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/users/${ctx.params.id}`
    );
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const people: People = await resp.json();

    return ctx.render(people);
  },
};

export default function Greet({ data }: PageProps<People>) {
  return <div>Hello {data.name}</div>;
}
