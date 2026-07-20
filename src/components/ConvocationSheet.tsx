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
        fontFamily: "'Arial', 'Noto Naskh Arabic', 'Amiri', sans-serif",
      }}
    >
      {pageNumber && totalPages ? (
        <div dir="ltr" className="text-xs text-gray-600 font-semibold mb-2 text-left">
          {pageNumber}/{totalPages}
        </div>
      ) : null}

      {/* Entête */}
      <header className="mb-8 leading-[1.55] text-center">
        <h1 className="text-[19px] font-bold mb-1">بوطيب سهام</h1>
        <p className="text-[13px]">خبيرة في الشؤون العقارية محلفة لدى المحاكم</p>
        <p className="text-[13px]">مهندسة مساحية طبوغرافية</p>
        <p className="text-[13px] mt-1">89 زنقة البنفسج، إقامة البنفسج، الطابق الأول</p>
        <p className="text-[13px]">مرس السلطان، الدار البيضاء</p>
        <p className="text-[13px] mt-1">
          الهاتف : 05.22.22.67.83 / 06.61.48.92.20
        </p>
      </header>

      {/* Destinataire */}
      <div className="text-center font-bold text-[15px] leading-[1.7] mb-6">
        <p>
          إلى  <span className="hl">{data.nom_destinataire}</span>
        </p>
        <p className="hl">{data.adresse_destinataire}</p>
        {sousTitre ? <p className="hl">{sousTitre}</p> : null}
      </div>

      {/* Références */}
      <div className="text-right font-bold text-[15px] mb-6 space-y-1">
        <p>
          ملف عدد : <span className="hl">{data.numero_dossier}</span>
        </p>
        <p>
          الصادر بتاريخ: <span className="hl">{data.date_decision}</span>
        </p>
      </div>

      {/* Corps */}
      <div
        className="convocation-body text-[15px] leading-[1.7] mb-10"
        style={{ textAlign: "justify", textJustify: "inter-word" }}
        dangerouslySetInnerHTML={{ __html: bodyHtml ?? "" }}
      />

      {/* Signature */}
      <div className="relative mb-8 h-20">
        {/* Texte centré */}
        <div className="absolute inset-0 flex items-start justify-center pt-1">
          <p className="text-[14px] font-semibold">و تقبلوا خالص تحياتي</p>
        </div>

        {/* Signature à gauche */}
        <div className="absolute left-0 top-6 text-left">
          <p className="font-bold mb-1">إمضاء :</p>
          <p className="font-bold">
            الخبيرة <span>بوطيب سهام</span>
          </p>
        </div>
      </div>

      {/* Mission */}
      {mission && mission.filter((m) => m.trim()).length > 0 ? (
        <div className="mt-4">
          <p className="font-bold mb-2 text-[15px]">المهمة :</p>
          <ul className="list-none space-y-1.5 text-[15px] leading-[1.55]">
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