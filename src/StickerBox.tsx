interface StickerBoxProps {
  sticker: string;
  label?: string;
  className?: string;
}

function StickerBox({ sticker, label, className }: StickerBoxProps) {
  return (
    <div className={`sticker-box ${className || ''}`}>
      <div className="sticker-box-frame">
        <div className="sticker-box-image-wrapper">
          <img
            src={sticker}
            alt="sticker"
            className="sticker-box-image"
          />
        </div>
      </div>
    </div>
  );
}

export default StickerBox;

