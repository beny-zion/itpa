import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const newPools = [
  {
    name: "מרכז מים הבריכה באצטדיון טדי ירושלים",
    city: "ירושלים",
    address: "אילון 1",
    phone: "026787277",
    email: "Yossi.rivlin@gmail.com",
    website: "www.mayim.co.il",
    treatments: ["הידרותרפיה", "התעמלות במים", "שחיית תינוקות", "שחייה"],
    is_accessible: true,
  },
  {
    name: "תנועה במים",
    city: "ירושלים",
    address: "אבא הלל סילבר 3",
    phone: "02-9904005",
    email: "Tnuabm@gmail.com",
    website: "",
    treatments: ["הידרותרפיה", "שחייה טיפולית"],
    is_accessible: true,
  },
  {
    name: "ענת",
    city: "הוד השרון",
    address: "הוד השרון",
    phone: "0502004637",
    email: "anathydro@gmail.com",
    website: "",
    treatments: ["הידרותרפיה"],
    is_accessible: false,
  },
  {
    name: "ווטרדנס בכפר הירוק",
    city: "רמת השרון",
    address: "הכפר הירוק",
    phone: "037943334",
    email: "Info@waterdance.co.il",
    website: "www.waterdance.co.il",
    treatments: ["הידרותרפיה", "טיפולי מים הוליסטיים", "שחיית פעוטות", "שיעורי שחייה", "שחייה טיפולית", "קבוצות התעמלות במים"],
    is_accessible: true,
  },
  {
    name: "המרכז ההידרותרפי בית איזי שפירא",
    city: "רעננה",
    address: "רחוב איזי שפירא 1",
    phone: "09-7701205",
    email: "hydrotherapy@beitissie.org.il",
    website: "https://beitissie.org.il/",
    treatments: ["טיפולי הידרותרפיה פרטניים וקבוצתיים", "ווטסו", "ג'אהרה", "פעילות תינוקות", "לימודי שחייה"],
    is_accessible: true,
  },
  {
    name: "הבריכה הטיפולית של ענת דוד",
    city: "הזורעים",
    address: "ביתניה 21",
    phone: "0528525616",
    email: "anatdavidcare@gmail.com",
    website: "",
    treatments: ["הידרותרפיה", "וואטסו", "שכירת מתחם הבריכה", "שחיית תינוקות", "חוגי שחייה", "התעמלות מים", "עיסויים"],
    is_accessible: true,
  },
  {
    name: "עוד טיפה",
    city: "שתולה",
    address: "מים רבים 26",
    phone: "0543286986",
    email: "danhadar.k@gmail.com",
    website: "",
    treatments: ["הידרותרפיה", "שחיית תינוקות", "שחייה רגשית", "וואטסו"],
    is_accessible: true,
  },
  {
    name: "הבריכה של נאוה",
    city: "רמת ישי",
    address: "האלון 69",
    phone: "054-7271631",
    email: "navazak21@gmail.com",
    website: "http://navapool.zak-malkin.com",
    treatments: ["תינוקות ופעוטים", "חוגי שחייה", "טיפולים ע\"י המושלם של כללית"],
    is_accessible: true,
  },
  {
    name: "לגעת במים בע\"מ",
    city: "מבוא חורון",
    address: "רח' התעשיה",
    phone: "0507645604",
    email: "lagatbamaim@gmail.com",
    website: "www.lbm.co.il",
    treatments: ["הידרותרפיה", "שחייה טיפולית", "ווטסו", "ג'אהרה", "ווטרדנס", "חוגי שחייה", "שחיית פעוטות", "התעמלות במים", "סדנאות"],
    is_accessible: true,
  },
  {
    name: "בראשית - הבריכה הטיפולית בבקעת הירדן",
    city: "מושב נעמ\"ה",
    address: "מושב נעמ\"ה, צפון ים המלח",
    phone: "0523749613",
    email: "elifarago1@gmail.com",
    website: "",
    treatments: ["הידרותרפיה", "טיפולי חוויה", "קורס שחייה", "חוג שחייה", "הפעלת פעוטות", "התעמלות במים"],
    is_accessible: true,
  },
  {
    name: "בריכת אלישע ירושלים",
    city: "ירושלים",
    address: "דרך בית לחם 52",
    phone: "02-5095577",
    email: "elishasport1@gmail.com",
    website: "www.elishamaim.co.il",
    treatments: ["הידרותרפיה", "שחייה טיפולית"],
    is_accessible: true,
  },
  {
    name: "בריכת אלישע הוד השרון",
    city: "הוד השרון",
    address: "רח' ז'בוטינסקי",
    phone: "09-9537979",
    email: "elishasport1@gmail.com",
    website: "www.elishamaim.co.il",
    treatments: ["שחייה טיפולית", "הידרותרפיה"],
    is_accessible: true,
  },
  {
    name: "מרכז הידרותרפי מבואות החרמון",
    city: "צומת כח",
    address: "צומת כח, ד.נ. גליל עליון",
    phone: "04-6542006",
    email: "mvhrpool@mvhr.org.il",
    website: "",
    treatments: ["הידרותרפיה", "פיזיותרפיה", "פרא רפואיים"],
    is_accessible: true,
  },
  {
    name: "מרכז בועות - אשדוד",
    city: "אשדוד",
    address: "ז'בוטינסקי 84",
    phone: "088657552",
    email: "buot@buot.org.il",
    website: "buot.org.il",
    treatments: ["הידרותרפיה", "שחייה טיפולית", "וואטסו", "באד ראגז'"],
    is_accessible: true,
  },
  {
    name: "מרכז בועות - יד בנימין",
    city: "נחל שורק",
    address: "האשל 19, יד בנימין",
    phone: "08-9568500",
    email: "yad.b@buot.org.il",
    website: "buot.org.il",
    treatments: ["הידרותרפיה", "שחייה טיפולית", "שחייה שיקומית", "וואטסו", "הלוויק", "באד ראגז'"],
    is_accessible: true,
  },
  {
    name: "מרכז בועות - צפת",
    city: "צפת",
    address: "דרך השוקלד",
    phone: "048336220",
    email: "zefat@buot.org.il",
    website: "buot.org.il",
    treatments: ["הידרותרפיה", "שחייה שיקומית טיפולית", "וואטסו", "באד ראגז'"],
    is_accessible: true,
  },
  {
    name: "HT Water and more",
    city: "רמת גן",
    address: "אלוף דוד 185",
    phone: "0523004620",
    email: "Ht.waterandmore@aquatherapy.co.il",
    website: "https://aquatherapy.co.il/",
    treatments: ["הידרותרפיה", "שחייה", "שחייה טיפולית", "שחייה שיקומית"],
    is_accessible: true,
  },
  {
    name: "הבריכה הטיפולית בעמק יזרעאל",
    city: "עמק יזרעאל",
    address: "עמותת ותיקי עמק יזרעאל, ת.ד. 3222 עפולה",
    phone: "04-6420195",
    email: "pool@eyz.org.il",
    website: "https://vatikim.emekyizrael.org.il",
    treatments: ["אורטופדיים", "נוירולוגיים", "התפתחותיים", "שחיית פעוטות", "טיפולי הנאה"],
    is_accessible: true,
  },
  {
    name: "רינאן ספורט",
    city: "באקה אל-גרביה",
    address: "באר אלסמאא 1",
    phone: "046769393",
    email: "Renansportplace@gmail.com",
    website: "",
    treatments: ["טיפולי הידרותרפיה בהסכם עם כל קופות החולים", "ילדים ומבוגרים"],
    is_accessible: true,
  },
  {
    name: "עדי ירושלים",
    city: "ירושלים",
    address: "הרקמה 9",
    phone: "025011015",
    email: "pool.j@adi-il.org",
    website: "",
    treatments: ["טיפולי הידרותרפיה", "טיפולים מוטוריים", "הידרותרפיה למונשמים", "התעמלות במים לנשים וגברים"],
    is_accessible: true,
  },
  {
    name: "יערה טיפולי מים כרמיאל",
    city: "כרמיאל",
    address: "להב 8 כרמיאל",
    phone: "0505755464",
    email: "yaara2221@gmail.com",
    website: "healing-water.co.il",
    treatments: ["הידרותרפיה", "שחייה טיפולית", "התעמלות", "ווטסו", "שחיית תינוקות"],
    is_accessible: true,
  },
  {
    name: 'יערה טיפולי מים ראש פינה צח"ר',
    city: "ראש פינה",
    address: "יהלום 4",
    phone: "0522414783",
    email: "yaara2221@gmail.com",
    website: "healing-water.co.il",
    treatments: ["הידרותרפיה", "שחייה טיפולית", "אירועים", "התעמלות במים", "שחיית תינוקות"],
    is_accessible: true,
  },
  {
    name: "נגה אירוח כפרי",
    city: "מעלה גמלא",
    address: "מנגו 9 מעלה גמלא",
    phone: "054-2474124",
    email: "noga@nog.co.il",
    website: "www.nog.co.il",
    treatments: ["הידרותרפיה", "שחייה טיפולית", "ג'הארה"],
    is_accessible: true,
  },
  {
    name: "לוטוס",
    city: "הר ברכה",
    address: "איתן 8",
    phone: "0547443188",
    email: "lotus7263@gmail.com",
    website: "",
    treatments: ["הידרותרפיה", "שחייה טיפולית", "וואטסו", "וואטרדאנס"],
    is_accessible: true,
  },
];

export async function POST(request) {
  try {
    // Verify admin session
    const adminSession = request.cookies.get("admin_session");
    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Step 1: Add website column if it doesn't exist
    // Using raw SQL via Supabase RPC
    await supabase.rpc("exec_sql", {
      sql: "ALTER TABLE pools ADD COLUMN IF NOT EXISTS website TEXT DEFAULT ''",
    }).catch(() => {
      // If RPC doesn't exist, try direct approach - column might already exist
      console.log("RPC not available, assuming website column exists or will be added manually");
    });

    // Step 2: Delete all existing pools
    const { error: deleteError } = await supabase
      .from("pools")
      .delete()
      .gte("id", 0);

    if (deleteError) {
      console.error("Delete error:", deleteError);
      // Try alternative delete
      const { error: deleteError2 } = await supabase
        .from("pools")
        .delete()
        .neq("id", -1);
      if (deleteError2) throw deleteError2;
    }

    // Step 3: Insert all new pools
    const { data, error: insertError } = await supabase
      .from("pools")
      .insert(newPools)
      .select();

    if (insertError) throw insertError;

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${data.length} pools`,
      pools: data,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed pools", details: error.message },
      { status: 500 }
    );
  }
}
