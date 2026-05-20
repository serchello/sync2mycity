const HeaderTitle = ({ title }: { title: string }) => (
  <h2
    style={{
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: 2,
      color: "#0077a2",
      textTransform: "uppercase",
      marginBottom: 12
    }}
  >
    {title}
  </h2>
);

export default HeaderTitle;