export default function Menu({}) {
  return (
    <Menu>
      <MenuButton
        {...attributes}
        {...listeners}
        className="cursor-pointer rounded-md click-effect transition-colors"
      >
        <EllipsisVerticalIcon
          className={`w-6 h-6 ${
            onFocus ? "text-black/50" : "text-transparent"
          }`}
        />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom start"
        className="w-32 origin-top-left rounded-lg border border-gray-200 bg-white p-1 text-sm shadow-lg focus:outline-none data-closed:scale-95 data-closed:opacity-0"
      >
        <MenuItem>
          <Button
            onClick={() => handleRemoveBlock(block.id)}
            className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-primay hover:bg-black/5 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
            삭제
          </Button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
