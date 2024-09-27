interface ISideBar {
    isOpen: boolean;
    onClose: () => void;
    isActive: (pathname: string) => boolean;
}

const SideBar = ({isOpen, onClose, isActive}: ISideBar) => {
    return (
        <div className="side-bar"></div>
    )

}

export default SideBar;