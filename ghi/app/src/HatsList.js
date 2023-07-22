function HatsList(props) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Fabric</th>
            <th>Style Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {props.hats.map(hat => {
            return (
              <tr key={hat.id}>
                <td>{ hat.fabric}</td>
                <td>{ hat.style_name}</td>
                <td>{ hat.location.closet_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  export default HatsList;
