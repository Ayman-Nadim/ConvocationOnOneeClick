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
        className="convocation-sheet shadow-2xl mx-auto text-right"
      >
        {pageNumber && totalPages ? (
        <div dir="ltr" className="text-xs text-gray-600 font-semibold mb-2 text-left">
          {pageNumber}/{totalPages}
        </div>
        ) : null}
        {/* Entête */}
        <header className="border-b-2 border-gray-800 pb-4 mb-8 text-rigth">
          <h1 className="text-2xl font-bold mb-1">بوطيب سهام</h1>
          <p className="text-sm leading-relaxed">
            خبيرة في الشؤون العقارية محلفة لدى المحاكم
            <br />
            مهندسة مساحية طبوغرافية
          </p>
          <p className="text-xs mt-2 leading-relaxed">
            89 زنقة البنفسج، إقامة البنفسج، الطابق الأول، مرس السلطان، الدار البيضاء
            <br />
            الهاتف: 05.22.22.67.83 / 06.61.48.92.20
          </p>
        </header>



        {/* {data.tribunal ? (
          <p className="text-sm mb-4 text-center">{data.tribunal}</p>
        ) : null} */}

        <p className="text-lg mb-2 text-center">
  إلى السيد(ة): <span className="hl font-bold">{data.nom_destinataire}</span>
</p>
<p className="text-base mb-8 text-center">
  المرجو الحضور إلى العنوان: <span className="hl">{data.adresse_destinataire}</span>
</p>
        {/* Références */}
        <div className=" text-sm mb-8">

          <div>
            ملف عدد: <span className="hl">{data.numero_dossier}</span>
          </div>
<br />
          <div>
            بتاريخ: <span className="hl">{data.date_decision}</span>
          </div>
        </div>
        {sousTitre ? (
          <p className="text-base mb-6 font-semibold">{sousTitre}</p>
        ) : null}

        <div
          className="border-t border-gray-300 pt-6 text-base leading-loose convocation-body"
          dangerouslySetInnerHTML={{ __html: bodyHtml ?? "" }}
        />
        <div className="mt-16 text-left">
  <p className="text-sm text-center underline w-32 mx-auto">امضاء</p>
  <p className="mt-1">
    <span className="font-bold">الخبيرة</span> بوطيب سهام
  </p>
</div>
        {mission && mission.filter((m) => m.trim()).length > 0 ? (
          <div className="mt-8 border-t border-gray-300 pt-4">
            <p className="font-bold mb-2">المهمة :</p>
            <ul className="list-none space-y-1 text-base leading-loose">
              {mission
                .filter((m) => m.trim())
                .map((m, i) => (
                  <li key={i}>— {m}</li>
                ))}
            </ul>
          </div>
        ) : null}


      </div>
    );
});