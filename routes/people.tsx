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
    const resp = await fetch("https://jsonplaceholder.typicode.com/users");
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const people: People[] = await resp.json();

    return ctx.render(people);
  },
};

export default function People({ data }: PageProps<People[]>) {
  return (
    <main>
      <h1>hello people!!</h1>
      <ul>
        {data.map((person) => (
          <li>
            <a href={`/people/${person.id}`}>{person.name}</a> - {person.email}
          </li>
        ))}
      </ul>
    </main>
  );
}
