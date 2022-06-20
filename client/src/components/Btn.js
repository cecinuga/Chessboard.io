export default function Btn({ id, name, href, img, classes, current }) {
    return (
        <div className={"Btn inline-block mr-2 mt-2 bg-red-600 p-1 text-gray-200 rounded border-2 border-solid border-red-800 mb-2"+classes}>
            <a className="" href={href}>{name}</a>
            <img className="" src={img}></img>
        </div>
    );
}