import React from 'react'

const ListGroup = (props) => {
    const { items, onItemSelect, selectedItem } = props;
    return <ul className="list-group cursor-pointer">
        {items.map((item) => {
            return <li onClick={() => onItemSelect(item)} key={item._id}
                className={item === selectedItem ? "list-group-item active btn" : "list-group-item btn cursor-na"}>{item.name}</li>
        })}
    </ul>

}

export default ListGroup