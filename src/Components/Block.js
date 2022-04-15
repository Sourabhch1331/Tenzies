
export default function Block(props){
    return (
        <div 
        className={`${props.idx} Block ${props.isFrozen ? "Frozen":""}`} 
        onClick={props.handleClick(Event)}>{props.num}
        </div>
    )
}