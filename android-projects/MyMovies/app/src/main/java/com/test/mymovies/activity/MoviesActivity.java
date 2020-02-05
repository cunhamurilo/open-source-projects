package com.test.mymovies.activity;

import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.os.AsyncTask;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.View;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.ScrollView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.test.mymovies.adapter.DateAdapter;
import com.test.mymovies.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

public class MoviesActivity extends AppCompatActivity {

    // Variables
    private TextView tv_vote,tv_overview,tv_vote_count,tv_error;
    private ImageView image;
    private RatingBar bar;
    private String id;
    private SharedPreferences mPrefs;
    private SharedPreferences.Editor prefsEditor;
    private Toolbar toolbar;
    private RecyclerView rv_date,rv_company;
    private RecyclerView.Adapter mAdapter;
    private ScrollView scrollView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_movies);

        // Suport toolbar and set back button
        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        // add variable to fields
        rv_date = findViewById(R.id.rv_movie_date);
        rv_company = findViewById(R.id.rv_movie_company);
        tv_vote = findViewById(R.id.tv_movie_vote_average);
        tv_overview = findViewById(R.id.tv_movie_overview);
        bar = findViewById(R.id.rb_movie_vote);
        tv_vote_count = findViewById(R.id.tv_movie_vote_count);
        image = findViewById(R.id.imageView2);
        tv_error = findViewById(R.id.tv_movie_error);
        scrollView = findViewById(R.id.sv_movie);
        tv_error.setVisibility(View.GONE);

        // Create a shared preferences
        mPrefs = getPreferences(MODE_PRIVATE);
        prefsEditor = mPrefs.edit();

        // Get information from another activity
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            String json = extras.getString("json");
            id = extras.getString("id");

            // Checks if network is available
            if(isNetworkAvailable(getApplicationContext())) {
                new downloadDados().execute();
            }else{
                String movies = mPrefs.getString(id, "");
                if(movies.isEmpty() || movies.equals("") || movies == null) {
                    tv_error.setVisibility(View.VISIBLE);
                    scrollView.setVisibility(View.GONE);
                }else{
                    getData(movies);
                }

            }

        }

    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        return true;
    }

    // Funciton checks if network is available
    public boolean isNetworkAvailable(Context context) {
        ConnectivityManager connectivityManager = ((ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE));
        return connectivityManager.getActiveNetworkInfo() != null && connectivityManager.getActiveNetworkInfo().isConnected();
    }

    // Function get movies from json
    private void getData(String json){
        try {
            JSONObject object = new JSONObject(json);

            prefsEditor.putString(object.getString("id"),json);
            prefsEditor.commit();

            toolbar.setTitle( object.getString("title") );
            tv_vote.setText( object.getString("vote_average") );
            tv_overview.setText( object.getString("overview") );

            String genres = String.valueOf(object.getJSONArray("genres"));
            genres = genres.replace("[","");
            genres = genres.replace("]","");
            genres = genres.replace("\"","");

            int hour = object.getInt("runtime");
            int h = hour/60;
            int m = hour%60;

            ArrayList<String> listDate = new ArrayList<>();
            listDate.add("");
            listDate.add(h+"h "+m+"min");
            listDate.add(genres);
            listDate.add(object.getString("release_date"));

            // Layout for date and time
            LinearLayoutManager layoutManager= new LinearLayoutManager(this,LinearLayoutManager.HORIZONTAL, false);
            rv_date.setHasFixedSize(true);
            rv_date.setLayoutManager(layoutManager);
            DividerItemDecoration dividerItemDecoration = new DividerItemDecoration(rv_date.getContext(),
                    layoutManager.getOrientation());
            rv_date.addItemDecoration(dividerItemDecoration);
            mAdapter = new DateAdapter(this,listDate,"date");
            rv_date.setAdapter(mAdapter);

            // Layout for company
            JSONArray arraylists = object.getJSONArray("production_companies");

            JSONObject obj;

            // Checks if exist image from production companies
            ArrayList<String> listCompany = new ArrayList<>();
            listCompany.add("");

            for (int i = 0; i < arraylists.length(); i++) {
                obj = new JSONObject(arraylists.getString(i));

                String company = obj.toString();
                if(company.contains("logo_url")) {
                    listCompany.add(obj.getString("logo_url"));
                }else {
                    listCompany.add(obj.getString("name"));
                }
            }

            LinearLayoutManager manager= new LinearLayoutManager(this,LinearLayoutManager.HORIZONTAL, false);
            rv_company.setLayoutManager(manager);
            rv_company.setHasFixedSize(true);
            mAdapter = new DateAdapter(this,listCompany,"comp");
            rv_company.setAdapter(mAdapter);

            tv_vote_count.setText( object.getString("vote_count")  );
            bar.setRating((float) object.getDouble("vote_average") / 2);

            Glide.with(this).load(object.getString("backdrop_url")).into(image);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    // Get data from HTML
    class downloadDados extends AsyncTask<Void, Void, String> {

        @Override
        protected void onPreExecute() {
            super.onPreExecute();

        }

        @Override
        protected String doInBackground(Void... params) {
            HttpURLConnection urlConnection = null;
            BufferedReader reader = null;
            try {
                URL url = new URL("https://desafio-mobile.nyc3.digitaloceanspaces.com/movies/"+id);
                urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setRequestMethod("GET");
                urlConnection.connect();
                InputStream inputStream = urlConnection.getInputStream();
                reader = new BufferedReader(new InputStreamReader(inputStream));
                String linha;
                StringBuffer buffer = new StringBuffer();
                while((linha = reader.readLine()) != null) {
                    buffer.append(linha);
                    buffer.append("\n");
                }

                return buffer.toString();
            } catch (Exception e) {
                e.printStackTrace();
                if (urlConnection != null) {
                    urlConnection.disconnect();
                }
                if (reader != null) {
                    try {
                        reader.close();
                    } catch (IOException e1) {
                        e1.printStackTrace();
                    }
                }
            }
            return null;
        }
        @Override
        protected void onPostExecute(String dados) {

            getData(dados);

        }

    }

}
