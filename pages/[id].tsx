import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      capital
      code
      continent {
        name
      }
      name
      currency
      emoji
      phone
      languages {
        name
      }
    }
  }
`;

export default function Homes() {
  const router = useRouter();
  const { loading, error, data } = useQuery(COUNTRY, {
    variables: {
      code: `${router.query.id}`,
    },
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error : {error.message}</div>;

  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ fontSize: "30px", fontWeight: "500" }}>{data.country.continent.name}</div>
      <div style={{ fontSize: "170px" }}>{data.country.emoji}</div>
      <div style={{ fontSize: "70px", fontWeight: "600" }}>{data.country.name}</div>
      <div style={{ fontSize: "60px" }}>Capital city: {data.country.capital}</div>
      <div style={{ fontSize: "50px" }}>Currency: {data.country.currency}</div>
      <div style={{ fontSize: "50px", color: "grey", textAlign: "center" }}>
        languages:
        <div style={{ display: "flex", gap: "20px" }}>
          {data.country.languages.map((el: any) => (
            <div>{el.name}</div>
          ))}
        </div>
      </div>
      <div style={{ fontSize: "50px" }}>Phone: {data.country.phone}...</div>
    </main>
  );
}
