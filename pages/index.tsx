import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const COUNTRIES = gql`
  query Countries {
    countries {
      continent {
        name
      }
      name
      emoji
      code
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(COUNTRIES);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error : {error.message}</div>;

  console.log(data);

  return (
    <main style={{ padding: "20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
          gap: "35px",
        }}>
        {data.countries.map((country: any) => (
          <Link href={country.code}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "3px solid black",
                borderRadius: "7px",
              }}>
              <div style={{ fontSize: "100px" }}>{country.emoji}</div>
              <div style={{ fontSize: "20px", fontWeight: "500" }}>{country.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
