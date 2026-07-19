import { forwardRef } from "react";

export type ConvocationData = {
  nom_destinataire: string;
  adresse_destinataire: string;
  numero_dossier: string;
  date_decision: string;
  tribunal?: string;
};

export const ConvocationSheet = forwardRef<
  HTMLDivElement,
  {
    data: ConvocationData;
    bodyHtml?: string;
    mission?: string[];
    sousTitre?: string;
    pageNumber?: number;
    totalPages?: number;
  }
>(function ConvocationSheet({ data, bodyHtml, mission, sousTitre, pageNumber, totalPages }, ref) {
  return (
    <div
      ref={ref}
      dir="rtl"
      lang="ar"
      className="convocation-sheet shadow-2xl mx-auto bg-white text-right text-black print:shadow-none print:mx-0"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "18mm 20mm",
        boxSizing: "border-box",
        fontFamily:
          "'Noto Naskh Arabic', 'Amiri', 'Arial', sans-serif",
      }}
    >
      {pageNumber && totalPages ? (
        <div dir="ltr" className="text-xs text-gray-600 font-semibold mb-2 text-left">
          {pageNumber}/{totalPages}
        </div>
      ) : null}

      {/* Entête */}
      <header className="mb-10 leading-[1.9]">
        <h1 className="text-[22px] font-bold mb-1">بوطيب سهام</h1>
        <p className="text-sm">خبيرة في الشؤون العقارية محلفة لدى المحاكم</p>
        <p className="text-sm">مهندسة مساحية طبوغرافية</p>
        <p className="text-sm mt-1">89 زنقة البنفسج، إقامة البنفسج، الطابق الأول</p>
        <p className="text-sm">مرس السلطان، الدار البيضاء</p>
        <p className="text-sm mt-1">
          الهاتف : 05.22.22.67.83 / 06.61.48.92.20
        </p>
      </header>

      {/* Destinataire */}
      <div className="text-center font-bold text-[17px] leading-[2.1] mb-10">
        <p>
          إلى  <span className="hl">{data.nom_destinataire}</span>
        </p>
        <p className="hl">{data.adresse_destinataire}</p>
        {sousTitre ? <p className="hl">{sousTitre}</p> : null}
      </div>

      {/* Références */}
      <div className="text-right font-bold text-base mb-8 space-y-2">
        <p>
          ملف عدد : <span className="hl">{data.numero_dossier}</span>
        </p>
        <p>
          الصادر بتاريخ: <span className="hl">{data.date_decision}</span>
        </p>
      </div>

      {/* Corps */}
      <div
        className="convocation-body text-base leading-[2.1] mb-14"
        style={{ textAlign: "justify", textJustify: "inter-word" }}
        dangerouslySetInnerHTML={{ __html: bodyHtml ?? "" }}
      />

      {/* Signature */}
     <div className="relative mb-10 h-28">
  {/* Texte centré */}
  <div className="absolute inset-0 flex items-center justify-center">
    <p className="text-sm font-semibold">و تقبلوا خالص تحياتي</p>
  </div>

  {/* Signature à droite */}
  <div className="absolute left-0 top-0 text-left">
    <p className="font-bold underline underline-offset-4 mb-2">إمضاء :</p>
    <p className="font-bold">
      الخبيرة <span>بوطيب سهام</span>
    </p>
  </div>
</div>

      {/* Mission */}
      {mission && mission.filter((m) => m.trim()).length > 0 ? (
        <div className="mt-6">
          <p className="font-bold mb-3 text-base">المهمة :</p>
          <ul className="list-none space-y-2 text-base leading-[1.9]">
            {mission
              .filter((m) => m.trim())
              .map((m, i) => (
                <li key={i} className="flex gap-2 pr-1">
                  <span>–</span>
                  <span className="flex-1">{m}</span>
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
});